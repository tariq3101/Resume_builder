# Resume Builder (MERN Stack)

This project is a Resume Builder application developed using the MERN stack (MongoDB, Express.js, React, Node.js). The application allows users to create, update, and save their resumes online. It includes features such as user authentication, auto-saving resume sections, and a simple interface to manage personal information, education, work experience, skills, projects, awards, and certifications.

## Features

- **User Authentication:** Secure user login and registration using JWT (JSON Web Token).
- **Auto-Save:** Automatically saves the user's input in each resume section.
- **Resume Sections:**
  - Personal Information
  - Education
  - Work Experience
  - Skills
  - Projects
  - Awards and Certifications
- **MongoDB Database:** Stores resume data for authenticated users.
- **React Frontend:** A responsive UI for managing and updating resume sections.

## Tech Stack

- **Frontend:** React
- **Backend:** Node.js with Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)

## Installation

### Prerequisites

Ensure that you have the following installed:

- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/try/download/community) (or use a cloud service like MongoDB Atlas)

### Steps to Run the Application

1. Clone the repository:
   ```
   git clone https://github.com/tariq3101/Resume_builder.git
   ```
2. Navigate to the project directory
3. Install dependencies for both frontend and backend:
   For Backend:
   ```
   cd backend
   npm install
   ```
   For Frontend:
   ```
   cd ../frontend
   npm install
   ```
4. Set up environment variables:
   In the backend directory, create a .env file and add the following:
   ```
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   ```
5. Start the backend server:
   ```
   cd backend
   npm start
   ```
6. Start the frontend server:
   ```
   cd frontend
   npm start
   ```
7. Visit the app in your browser at http://localhost:3000.
