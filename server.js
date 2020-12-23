// Chunk 1
require('dotenv').config();
const express = require('express');
const path = require('path');
const sendMail = require('./mail');
const { log } = console;
const app = express();

const PORT = 8080;


// Data parsing
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

app.use(express.static("public"));



// email, subject, text
app.post('/email', (req, res) => {
    const { subject, email, text, name, exampleFormControlSelect1 } = req.body;
    log('Data: ', req.body);

    sendMail(name, email, subject, exampleFormControlSelect1, text, function(err, data) {
        if (err) {
            log('ERROR: ', err);
            return res.status(500).json({ message: err.message || 'Internal Error' });
        }
        log('Email sent!!!');
        return res.json({ message: 'Email sent!!!!!' });
    });
});


// Render home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Error page
app.get('/error', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'error.html'));
});

// Email sent page
app.get('/email/sent', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'emailMessage.html'));
});

// Imprint page
app.get('/imprint.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'imprint.html'));
});

// Privacy page
app.get('/privacy.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'privacy.html'));
});

// Start server
app.listen(PORT, () => log('Server is starting on PORT, ', 8080));