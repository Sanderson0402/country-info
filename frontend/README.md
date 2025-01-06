# CountryInfo App

This is a full-stack application consisting of a **React** frontend and an **Express** backend. The app allows users to select a country from a list and view information about it, including population data and flags, fetched from external APIs.

## Features

- List of countries fetched from an external API.
- Country details including population data and flags.
- Responsive UI styled with **Tailwind CSS**.
- Backend built with **Express.js** and data fetched from external APIs.

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Express.js
- **External APIs**:
  - `https://date.nager.at/api/v3/AvailableCountries` for the list of available countries.
  - `https://countriesnow.space/api/v0.1/countries/population` and `https://countriesnow.space/api/v0.1/countries/flag/images` for population data and country flags.

## Prerequisites

Before you get started, make sure you have the following installed:

- **Node.js** (version 14 or higher)
- **npm** or **yarn**
- A code editor such as [Visual Studio Code](https://code.visualstudio.com/)

## Installation

### Backend (Express API)

1. Clone the repository or navigate to the backend folder
2. Install dependencies:
   npm install

### Frontend (Express API)

1. Clone the repository or navigate to the frontend folder
2. Install dependencies:
   npm install
3. Set up Tailwind CSS:
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init
4. Configure the tailwind.config.js file:
    module.exports = {
        content: [
            "./src/**/*.{js,jsx,ts,tsx}",
        ],
        theme: {
            extend: {},
        },
        plugins: [],
    }

## Running Both Frontend and Backend

1. Start the Backend (Express API)
    cd backend
    npm install  # Install dependencies (if you haven't already)
    npm start    # Start the backend server

2. Start the Frontend (React app)
    cd frontend
    npm install  # Install dependencies (if you haven't already)
    npm start    # Start the frontend development server
