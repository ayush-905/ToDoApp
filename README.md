# ToDoApp

## Backend

### Description

Backend folder follows MVC architecture with models folder containing the database schema used and middleware folder contain middlewares for authentication and error handling.
Routes folder specifies the different api endpoint and controller folder handles the databased updates.

### Technologies

- **Node.js**
- **Express.js**
- **MySQL (with Sequelize as ORM)**

### Backend Setup

1. Create a `.env` file in the `backend` folder.
2. Add the following configurations to the `.env` file:

   ```env
   PORT= 8080
   JWT_SECRET: your_secret_key_here
   NODE_ENV: development
   DB_NAME= your database name
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_HOST=your_database_host

3. Run `npm install` and then `npm run server` which will start a new server at a PORT specified.


## Frontend

### Description

The frontend folder contains the files responsible for the user interface.

### Technologies

- **React.js**
- **Redux Toolkit**

### Frontend Setup

1. Open the frontend folder.
2. Replace `API_URL` in `helper.js` with your backend server url.
3. Run `npm install` and then `npm run` which will start the app.

