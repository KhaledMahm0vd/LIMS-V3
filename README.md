# Laboratory Management System

A full-stack web application for managing laboratory tests, patients, and test results. Built with **Node.js** and **PostgreSQL** for the backend, and **React.js** for the frontend.

---

## Features

- **Patient Management**: Add, view, and manage patient details.
- **Lab Test Management**: Add, view, and manage lab tests.
- **Test Assignment**: Assign lab tests to patients and record results.
- **User Authentication**: Secure authentication using JWT (JSON Web Tokens).
- **Real-Time Notifications**: Notify users of new test results using Socket.IO.
- **Reporting**: Generate reports and analytics for lab test results.
- **Advanced UI**: Built with **Material-UI** for a modern and responsive user interface.

---

## Technologies Used

### Backend
- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Web framework for Node.js.
- **PostgreSQL**: Relational database for storing data.
- **JWT**: JSON Web Tokens for user authentication.
- **Socket.IO**: Real-time communication between the server and clients.
- **Multer**: Middleware for handling file uploads.

### Frontend
- **React.js**: JavaScript library for building the user interface.
- **Axios**: HTTP client for making API requests.
- **Material-UI**: Component library for a polished UI.
- **Chart.js**: Data visualization library for analytics.

---

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **PostgreSQL** (v12 or higher)
- **npm** (Node Package Manager)

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/KhaledMahm0vd/LIMS-V3.git
cd LIMS-V3
```

---

### 2. Set Up the Backend

1. Navigate to the backend directory:
   ```bash
   cd lab-management-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `lab-management-backend` directory and add the following environment variables:
   ```env
   DB_HOST=localhost
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=lab_management
   DB_PORT=5432
   JWT_SECRET=your_jwt_secret_key
   ```

4. Create the `lab_management` database in PostgreSQL:
   ```bash
   sudo -i -u postgres
   psql
   CREATE DATABASE lab_management;
   \q
   ```

5. Run the database migrations to create tables:
   ```sql
   CREATE TABLE patients (
       id SERIAL PRIMARY KEY,
       name VARCHAR(100) NOT NULL,
       age INT NOT NULL,
       gender VARCHAR(10) NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   CREATE TABLE lab_tests (
       id SERIAL PRIMARY KEY,
       test_name VARCHAR(100) NOT NULL,
       description TEXT,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   CREATE TABLE patient_tests (
       id SERIAL PRIMARY KEY,
       patient_id INT REFERENCES patients(id) ON DELETE CASCADE,
       test_id INT REFERENCES lab_tests(id) ON DELETE CASCADE,
       result TEXT,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

6. Start the backend server:
   ```bash
   node src/server.js
   ```

---

### 3. Set Up the Frontend

1. Navigate to the frontend directory:
   ```bash
   cd lab-management-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```

4. Open your browser and visit:
   ```
   http://localhost:3000
   ```

---

## API Endpoints

### Patients
- **GET** `/api/patients`: Get all patients.
- **POST** `/api/patients`: Add a new patient.

### Lab Tests
- **GET** `/api/lab-tests`: Get all lab tests.
- **POST** `/api/lab-tests`: Add a new lab test.

### Authentication
- **POST** `/api/register`: Register a new user.
- **POST** `/api/login`: Log in and get a JWT token.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## Contact

For questions or feedback, please contact:

- **Your Name** Khaled Mahmoud
- **Email**: khaled.mahmoud.23rd@gmail.com
- **GitHub**: [KhaledMahmoud](https://github.com/KhaledMahm0vd)

---

Enjoy using the **Laboratory Management System**! 🚀
