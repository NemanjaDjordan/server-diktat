const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8000;

// Define the folder where your MP3 files are stored
const MP3_FOLDER = path.join(__dirname, 'enkriptovani_mp3_fajlovi');

// Enable CORS for all routes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Serve MP3 files as static files
app.use(express.static(MP3_FOLDER));

// Log available file links every 10 seconds
setInterval(() => {
    console.log('Available file links:');
    fs.readdir(MP3_FOLDER, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }
        files.filter(file => file.endsWith('.mp3')).forEach(file => {
            console.log(`http://localhost:${PORT}/${file}`);
        });
    });
}, 10000);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
