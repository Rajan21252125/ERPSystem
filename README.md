# ERP System

This is an ERP (Enterprise Resource Planning) system for managing student and teacher information. The project is built using React for the frontend and Node.js with Express for the backend. MongoDB is used as the database to store user information.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and authorization for students and teachers.
- Separate dashboards for students and teachers.
- Storage of student and teacher information in MongoDB.
- Integration with Chart.js for data visualization.

## Installation

1. **Clone the repository:**
   git clone https://github.com/Rajan21252125/ERPSystem.git
   
2. **Navigate to the project directory:**
    cd erp-system

3. **Install dependencies in both frontedn as well as backend:**
    npm install

4. **Set up the backend (Node.js and MongoDB).**

5. **Start the devlopment server**
    npm start

6. **Open your browser and go to http://localhost:3000 to view the application for frontend.**



Usage
Access the login page at http://localhost:3000/login to log in as a student or teacher.
After logging in, navigate to the respective dashboard:
    Student Dashboard: http://localhost:3000/
    Teacher Dashboard: http://localhost:3000/admin



Project Structure
    /frontend/src: Contains the React frontend code.
    /backend: Contains the Node.js backend code.
    /frontend/public: Public assets and HTML template.


Dependencies
    React
    Node.js
    Express
    MongoDB
    Chart.js


Contributing
Feel free to contribute to this project by opening issues or submitting pull requests.

License
This project is licensed under the MIT License.