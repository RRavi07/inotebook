
# iNotebook - Cloud-Based Note-Taking Application

**iNotebook** is a cloud-based note-taking application built with React for the frontend and Node.js for the backend. The app allows users to create, save, edit, and manage notes with attributes like title, description, and tags. The backend handles data storage and retrieval, ensuring that notes are securely stored and accessible from any device.
![Screenshot 2024-10-08 102526](https://github.com/user-attachments/assets/d270f9e9-ff70-4057-bb17-c9072792241d)
![Screenshot 2024-10-08 102510](https://github.com/user-attachments/assets/319d25e4-95c8-4cce-8e11-9d6b6fb34639)

## Prerequisites

Before running the app, make sure you have Node.js installed. The project includes both frontend and backend components, so you need to install dependencies for both.

### Steps to Install Dependencies:

1. First, navigate to the main project directory and install the frontend dependencies:
   ```bash
   npm install
   ```

2. Then, navigate to the `backend` folder and install the backend dependencies:
   ```bash
   cd backend
   npm install
   ```

## Running the App

You need to start the backend server before running the frontend. Follow these steps:

### Start the Backend

In the `backend` folder, start the backend server with:

```bash
cd backend
node index.js
```

Ensure the backend is running on the appropriate port, typically defined in your backend configuration.

### Start the Frontend

After the backend is running, you can start the frontend by navigating back to the main project directory and running:

```bash
npm run start
```

This will start the React frontend at [http://localhost:3000](http://localhost:3000).

### Running Both Frontend and Backend Together

To run both the frontend and backend concurrently, you can use the following command:

```bash
npm run both
```

This command will start the backend server first and then automatically start the React frontend.

## Key Features

- **Create Notes:** Add notes with a title, description, and optional tags to categorize your content.
- **Edit and Delete Notes:** Modify or delete existing notes seamlessly.
- **Cloud Storage:** Save notes securely to the cloud, ensuring they are accessible across multiple devices.

## Project Images

You can add images or screenshots to showcase features such as note creation, note management, and the tag-based system. Store these images in a folder like `/images` and update this section with links or previews of the app's functionality.

---

## Available Scripts

In the project directory, you can run:

- **`npm start`** – Starts the frontend in development mode.
- **`cd backend && node index.js`** – Starts the backend server.
- **`npm run both`** – Runs both the frontend and backend concurrently.

## Notes

- Ensure that both the frontend and backend dependencies are installed before running the app.
- The backend is responsible for handling data storage and security, ensuring your notes are saved securely in the cloud.
- Configure the backend (such as ports and API routes) in the `backend` folder as needed.
