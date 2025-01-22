const pool = require('../config/db');
const { use } = require('../routers/user');

const getUser = async (req, res) => {
    try {
        const data = await pool.query(`
            SELECT u.id, u.name, u.username, u.email, u.phone, u.website,
                   json_build_object(
                       'street', a.street,
                       'suite', a.suite,
                       'city', a.city,
                       'zipcode', a.zipcode,
                       'geo', json_build_object('lat', g.lat, 'lng', g.lng)
                   ) AS address,
                   json_build_object(
                       'name', c.name,
                       'catchPhrase', c.catchphrase,
                       'bs', c.bs
                   ) AS company
            FROM users u
            JOIN addresses a ON u.address_id = a.id
            JOIN geo g ON a.geo_id = g.id
            JOIN companies c ON u.company_id = c.id;
        `);
        const users = data.rows;
        res.json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const postUser = async (req, res) => {
    try {
        const data = req.body;
        const geo = await pool.query('INSERT INTO geo (lat, lng) VALUES ($1, $2) RETURNING id', [
            data.address?.geo?.lat || null,
            data.address?.geo?.lng || null
        ]);
        const address = await pool.query('INSERT INTO addresses (street, suite, city, zipcode, geo_id) VALUES ($1, $2, $3, $4, $5) RETURNING id', [
            data.address?.street || null,
            data.address?.suite || null,
            data.address?.city || null,
            data.address?.zipcode || null,
            geo.rows[0].id
        ]);
        const company = await pool.query('INSERT INTO companies (name, catchPhrase, bs) VALUES ($1, $2, $3) RETURNING id', [
            data.company?.name || null,
            data.company?.catchPhrase || null,
            data.company?.bs || null
        ]);
        const user = await pool.query('INSERT INTO users (name, username, email, address_id, phone, website, company_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id', [
            data.name || null,
            data.username || null,
            data.email || null,
            address.rows[0].id,
            data.phone || null,
            data.website || null,
            company.rows[0].id
        ]);
        res.json({ message: 'User added successfully', status: 'success', id: user.rows[0].id });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;

        // Delete user
        const user = await pool.query('SELECT address_id, company_id FROM users WHERE id = $1', [id]);
        if (user.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const addressId = user.rows[0].address_id;
        const companyId = user.rows[0].company_id;

        // Delete user
        await pool.query('DELETE FROM users WHERE id = $1', [id]);

        // Delete address and geo
        const address = await pool.query('SELECT geo_id FROM addresses WHERE id = $1', [addressId]);
        if (address.rows.length > 0) {
            const geoId = address.rows[0].geo_id;
            await pool.query('DELETE FROM addresses WHERE id = $1', [addressId]);
            await pool.query('DELETE FROM geo WHERE id = $1', [geoId]);
        }

        // Delete company
        await pool.query('DELETE FROM companies WHERE id = $1', [companyId]);

        res.json({ message: 'User and related data deleted successfully', status: 'success' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const editUser = async (req, res) => {
    const data = req.body;
    const id = req.params.id;

    try {
        const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

        if (user.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const addressId = user.rows[0].address_id;
        const companyId = user.rows[0].company_id;

        if (data.address) {
            const address = await pool.query('SELECT * FROM addresses WHERE id = $1', [addressId]);
            await pool.query('UPDATE addresses SET street = $1, suite = $2, city = $3, zipcode = $4 WHERE id = $5', [
                data.address.street || address.rows[0].street,
                data.address.suite || address.rows[0].suite,
                data.address.city || address.rows[0].city,
                data.address.zipcode || address.rows[0].zipcode,
                addressId
            ]);

            if (data.address.geo) {
                const geoId = address.rows[0].geo_id;
                const geo = await pool.query('SELECT * FROM geo WHERE id = $1', [geoId]);
                await pool.query('UPDATE geo SET lat = $1, lng = $2 WHERE id = $3', [
                    data.address.geo.lat || geo.rows[0].lat,
                    data.address.geo.lng || geo.rows[0].lng,
                    geoId
                ]);
            }
        }

        if (data.company) {
            const company = await pool.query('SELECT * FROM companies WHERE id = $1', [companyId]);
            await pool.query('UPDATE companies SET name = $1, catchPhrase = $2, bs = $3 WHERE id = $4', [
                data.company.name || company.rows[0].name,
                data.company.catchPhrase || company.rows[0].catchPhrase,
                data.company.bs || company.rows[0].bs,
                companyId
            ]);
        }

        // Update user
        await pool.query('UPDATE users SET name = $1, username = $2, email = $3, phone = $4, website = $5 WHERE id = $6', [
            data.name || user.rows[0].name,
            data.username || user.rows[0].username,
            data.email || user.rows[0].email,
            data.phone || user.rows[0].phone,
            data.website || user.rows[0].website,
            id
        ]);

        res.json({ message: 'User updated successfully', status: 'success' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getUser,
    postUser,
    deleteUser,
    editUser
}
