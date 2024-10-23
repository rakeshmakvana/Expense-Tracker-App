# Expense Tracker App

An Expense Tracker Application built with React, Node.js, Express, and MongoDB. This application allows users to create, manage, and delete your Expenses or Incoms. It includes features such as Chart js, JWT token authentication, and a responsive UI.

## Features

- User Authentication using JWT
- Create, Read, Update, and Delete Expens or Incoms
- Pio Chart in Show realtime Expens or Incoms  
- Bar Chart show monthly transction Expens or Incoms
- Responsive and user-friendly interface
- Data stored in MongoDB Atlas

## Technologies Used

- **Frontend:** React, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication:** JWT
- **CSS Framework:** Tailwind CSS (or any other framework you choose)

## Environment Variables

Before running the application, set up the following environment variables :-

  MONGODB_URL = your db link

  JWT_SECRET = your secret

  PORT = 4000


## Getting Started

### Clone the Repository

```bash
git clone https://github.com/rakeshmakvana/Expense-Tracker-App
```

## Frontend Setup

```bash
cd frontend
```

```bash
npm install
```

```bash
npm run dev
```

## Backend Setup

```bash
cd backend
```

```bash
npm install
```

```bash
npm start
```

## URLs

Frontend URL: http://localhost:5173

Backend URL: http://localhost:4000

## Usage

You’ve developed an innovative expense tracker app that features secure user authentication via JWT for seamless login and signup.
The app allows users to effortlessly manage their finances by adding, viewing, editing, and deleting their income or expenses.
It provides a comprehensive overview of their financial status by calculating total amounts and visualizing real-time data through engaging pie and bar charts.
This unique blend of functionality makes it a valuable tool for personal finance management!

## Troubleshooting

If you encounter any issues while running the application, please ensure :-

You have set the correct environment variables.
The MongoDB Atlas connection string is correct and your IP is whitelisted.
Both frontend and backend servers are running without errors.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.
