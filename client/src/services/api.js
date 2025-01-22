import axios from "axios";

const getUsers = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/user');
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}

const addUser = async (data) => {
    try {
        const user = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            website: data.website,
        }
        const response = await axios.post('http://localhost:3000/api/user', user);
        return response.data;
    } catch (error) {
        console.error("Error posting users:", error);
        return [];
    }
}

const deleteUserApi = async (id) => {
    try {
        console.log(id);
        const response = await axios.delete(`http://localhost:3000/api/user/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting users:", error);
        return [];
    }
}

const updateUserApi = async (data) => {
    try {
        const user = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            website: data.website,
        }
        const response = await axios.put(`http://localhost:3000/api/user/${data.id}`, user);
        return response.data;
    } catch (error) {
        console.error("Error updating users:", error);
        return [];
    }
}

export { getUsers, addUser, deleteUserApi, updateUserApi };