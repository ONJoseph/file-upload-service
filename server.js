const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const filename = `${Date.now()}${extension}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

app.use(express.static('public'));

// Endpoint for uploading a file
app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ message: 'File uploaded successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

/*
Documentation:
 Node.js application using the Express.js framework to handle file uploads using the multer middleware. Here's a step-by-step explanation of the code:

Importing Required Modules:

express: Imports the Express.js framework for building web applications.
multer: Imports the multer middleware for handling file uploads.
fs: Imports the Node.js File System module for working with the file system.
path: Imports the Node.js path module for working with file and directory paths.
Create an Express Application:

Creates an instance of the Express application and assigns it to the app variable.
Defines the port number (3000) for the server, which can be set via the environment variable PORT or defaults to 3000.
Configure Multer Storage:

Sets up a storage engine for multer using multer.diskStorage. This configuration specifies how uploaded files will be stored on the server.
destination: Defines the directory where uploaded files will be stored. It checks if the 'uploads' directory exists; if not, it creates it.
filename: Defines the name of the uploaded file. It appends a timestamp (Date.now()) to the original filename to make it unique.
Create a multer Middleware:

Initializes multer middleware using the configured storage settings.
Serve Static Files:

Configures Express to serve static files from the 'public' directory. This is useful for serving HTML, CSS, or other client-side files.
Define an Endpoint for File Upload:

Sets up a POST endpoint at '/upload' for handling file uploads.
Uses the upload.single('file') middleware to handle a single file upload with the field name 'file'.
When a file is uploaded, it responds with a JSON object containing the message "File uploaded successfully."
Start the Express Server:

Starts the Express server on the specified port (default: 3000).
Outputs a message to the console indicating that the server is running.
This code creates a basic server that can accept file uploads and store them in the 'uploads' directory with unique filenames. It's a common pattern for handling file uploads in web applications. Users can upload files to the '/upload' endpoint, and the server will respond with a success message upon successful upload.

*/