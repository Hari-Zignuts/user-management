-- Create the geo table
CREATE TABLE geo (
    id SERIAL PRIMARY KEY,
    lat VARCHAR(50),
    lng VARCHAR(50)
);

-- Create the addresses table
CREATE TABLE addresses (
    id SERIAL PRIMARY KEY,
    street VARCHAR(255),
    suite VARCHAR(100),
    city VARCHAR(100),
    zipcode VARCHAR(20),
    geo_id INTEGER REFERENCES geo(id) ON DELETE CASCADE
);

-- Create the companies table
CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    catchPhrase VARCHAR(255),
    bs VARCHAR(255)
);

-- Create the users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    address_id INTEGER REFERENCES addresses(id) ON DELETE CASCADE,
    phone VARCHAR(50),
    website VARCHAR(255),
    company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE
);
