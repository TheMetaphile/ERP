# School ERP System

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Modules](#modules)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Routes](#routes)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The School ERP System is a comprehensive solution designed to manage various administrative and academic tasks in an educational institution. This system integrates multiple modules that facilitate assignment management, notes management, location-based attendance, in-app chat, feedback loops, panels for Heads of Departments (HOD) and Deans, psychometric testing, and a doubts asking system.

## Features

- **Assignment Management**: Streamlined management of assignments with submission tracking and grading.
- **Notes Management**: Centralized notes repository accessible to students and faculty.
- **Location-Based Attendance**: Automated attendance tracking based on location.
- **In-App Chat**: Secure messaging system for students and faculty.
- **Feedback Loop**: Systematic collection and analysis of feedback.
- **HOD and Dean Panels**: Dedicated panels for Heads of Departments and Deans to manage departmental activities.
- **Psychometric Tests**: Tools for conducting and analyzing psychometric tests.
- **Doubts Asking System**: Platform for students to ask and resolve academic doubts.

## Modules

1. **Assignment Management**
2. **Notes Management**
3. **Location-Based Attendance**
4. **In-App Chat**
5. **Feedback System**
6. **HOD Panel**
7. **Dean Panel**
8. **Psychometric Tests**
9. **Doubts Asking System**

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Other Tools**: Docker, Nginx

## Installation

### Prerequisites

- Node.js (>=14.x)
- MongoDB (>=4.x)
- Docker (optional, for containerization)

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/school-erp-system.git
    ```
2. Navigate to the project directory:
    ```bash
    cd school-erp-system
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Set up environment variables:
    Create a `.env` file in the root directory and add the following:
    ```plaintext
    PORT=3000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```
5. Start the application:
    ```bash
    npm start
    ```

## Usage

After starting the application, open your browser and navigate to `http://localhost:3000`. You should see the login page for the School ERP System.

### API Endpoints

The API endpoints are documented using Swagger. Navigate to `http://localhost:3000/api-docs` to access the Swagger documentation.

## Routes

### Public Routes

- **Login**: `/`
- **Reset Password**: `/resetpassword`
- **Set New Password**: `/newPassword`

### Student Dashboard Routes

- **Dashboard**: `/Student-Dashboard`
  - **Home**: `/Student-Dashboard/home`
  - **Assignment Report**: `/Student-Dashboard/assignment`
  - **Fee Due**: `/Student-Dashboard/fee-due`
  - **Events**: `/Student-Dashboard/events`
  - **Profile**: `/Student-Dashboard/profile`
  - **Receipt**: `/Student-Dashboard/receipt`
  - **Quiz**: `/Student-Dashboard/quiz`
    - **Panel**: `/Student-Dashboard/quiz`
    - **Subject Quiz**: `/Student-Dashboard/quiz/:subject`
  - **Examination**: `/Student-Dashboard/exam`
    - **Exam Panel**: `/Student-Dashboard/exam`
    - **Subject Exam**: `/Student-Dashboard/exam/:subject`
  - **Result**: `/Student-Dashboard/result`
  - **Attendance**: `/Student-Dashboard/attendance`
  - **Date Sheet**: `/Student-Dashboard/datesheet`
  - **Time Table**: `/Student-Dashboard/timetable`
  - **Class Work**: `/Student-Dashboard/classwork`
    - **Today Class Work**: `/Student-Dashboard/classwork`
    - **Subject Class Work**: `/Student-Dashboard/classwork/:name`
  - **Home Work**: `/Student-Dashboard/homework`
    - **All Homework**: `/Student-Dashboard/homework`
    - **Subject Homework**: `/Student-Dashboard/homework/:name`
  - **Ask Doubt**: `/Student-Dashboard/askdoubt`
    - **My Doubts**: `/Student-Dashboard/askdoubt/mydoubts`
    - **All Doubts**: `/Student-Dashboard/askdoubt/alldoubt`
  - **Notification**: `/Student-Dashboard/notification`
    - **All Notifications**: `/Student-Dashboard/notification/allnotification`
    - **Inbox**: `/Student-Dashboard/notification/inbox`
    - **Archived**: `/Student-Dashboard/notification/archived`
  - **Leave**: `/Student-Dashboard/leave`
  - **Gallery**: `/Student-Dashboard/gallery`
  - **Broadcast**: `/Student-Dashboard/broadcast`
  - **Activities**: `/Student-Dashboard/activities`
    - **Recent Activity**: `/Student-Dashboard/activities/recentactivity`
    - **All Activity**: `/Student-Dashboard/activities/allactivity`
  - **Medical**: `/Student-Dashboard/medical`

### Admin Dashboard Routes

- **Dashboard**: `/Admin-Dashboard`
  - **Home**: `/Admin-Dashboard`
  - **Students**: `/Admin-Dashboard/Students`
    - **Students List**: `/Admin-Dashboard/Students`
    - **Student Detail**: `/Admin-Dashboard/Students/:id`
  - **Student Admission Form**: `/Admin-Dashboard/StudentsAddmissionForm`
  - **Student Attendance**: `/Admin-Dashboard/StudentAttendance`
  - **Student Promotion**: `/Admin-Dashboard/StudentPromotion`
  - **Student Result**: `/Admin-Dashboard/StudentResult`
    - **Result Details**: `/Admin-Dashboard/StudentResult/Details`
  - **Teachers**: `/Admin-Dashboard/Teachers`
    - **All Teachers**: `/Admin-Dashboard/Teachers`
    - **Teacher Profile**: `/Admin-Dashboard/Teachers/Profile`
    - **Add Teacher**: `/Admin-Dashboard/AddTeachers`
    - **Teacher Attendance**: `/Admin-Dashboard/TeachersAttendance`
    - **Teacher Salary**: `/Admin-Dashboard/TeachersSalary`
  - **Parents**: `/Admin-Dashboard/Parents/AllParents`
    - **Parent Details**: `/Admin-Dashboard/Parents/AllParents/Details`
  - **Library**: `/Admin-Dashboard/Library/AllBooks`
  - **Transport**: `/Admin-Dashboard/Transport`
  - **Notice**: `/Admin-Dashboard/Notice`
  - **Leave**: `/Admin-Dashboard/Leave`
  - **Classes**: `/Admin-Dashboard/Classes`
  - **Exam**: `/Admin-Dashboard/Exam`
  - **Message**: `/Admin-Dashboard/Message`
  - **Subjects**: `/Admin-Dashboard/Subjects`
  - **Account Expenses**: `/Admin-Dashboard/Account/Expenses`
  - **Teacher-Student Account**: `/Admin-Dashboard/Account/TeacherStudents`

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
