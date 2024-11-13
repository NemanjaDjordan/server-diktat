const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8000;

// Folder where MP3 files are stored
const MP3_FOLDER = path.join(__dirname, 'enkriptovani_mp3_fajlovi');

// Enable CORS for all routes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Serve MP3 files on a specific route
app.use('/mp3', express.static(MP3_FOLDER));

// Function to log publicly accessible file links
function logPublicLinks() {
    const baseUrl = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;
    console.log('Available file links:');
    fs.readdir(MP3_FOLDER, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }
        files.filter(file => file.endsWith('.mp3')).forEach(file => {
            console.log(`${baseUrl}/mp3/${file}`);
        });
    });
}

// Log links when the server starts
logPublicLinks();

// Handle 404 errors for unknown routes
app.use((req, res, next) => {
    res.status(404).send('File not found');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on ${process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`}`);
});
