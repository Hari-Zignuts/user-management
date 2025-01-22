# Users Management Application (Next.js + Node.js)

This application provides a user management system with the following features:

## Features

- Proper state management with Like button
- Edit user details with a modal pop-up
- Remove specific users (frontend only)
- Reflect edited data in the list using state management
- Fetch user data from this [API](https://jsonplaceholder.typicode.com/users)
- Fetch user avatars from [RoboHash](https://robohash.org)
- **Additional Feature:** Add new users
- **Additional Feature:** Landing page with Next.js router

## Users List

The users list is fetched from the following API: [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users). Each user has an avatar fetched from [RoboHash](https://robohash.org).

## Project Structure

This repository contains two main folders:
- `client`: Contains the Next.js files for the frontend.
- `server`: Contains the Node.js files and PostgreSQL with pool API server for the backend.

## How to Run

1. Clone the repository.
2. Navigate to the `client` folder and install dependencies using `npm install`.
3. Run the frontend application using `npm run dev`.
4. Navigate to the `server` folder and install dependencies using `npm install`.
5. Run the backend server using `npm start`.
6. Open your browser and navigate to `http://localhost:3000`.

## Live Demo

Check out the live demo of the application [here](https://users-management-three.vercel.app/).

## Technologies Used

- React
- Next.js
- Tailwind CSS
- Axios
- Node.js
- PostgreSQL

## Screenshot

![home Screenshot](./client/screenshot1.png)
![Website Screenshot](./client/screenshot2.png)

## Contributing

Feel free to submit issues and pull requests for new features or bug fixes.

## License

This project is licensed under the MIT License.