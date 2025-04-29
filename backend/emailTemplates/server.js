const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const validator = require('validator');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
},
//verify if the transported was set correctly
// console.log("user :" + process.env.EMAIL_USER),
// console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
);

// Setup Handlebars for email templates
transporter.use('compile', hbs({
    viewEngine: {
        partialsDir: path.resolve('./emailTemplates/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./emailTemplates/'),
}));

// Authentication middleware
const authenticateRequest = (req, res, next) => {
    const authHeader = req.headers.authorization;
    //change this part so it uses the token ffrom the local memory when our system is authenticated
    if (authHeader !== 'Bearer your_custom_token') {
        return res.status(403).json({ error: 'Unauthorized request' });
    }
    next();
};

// API route to send email
app.post('/send-messages', authenticateRequest, async (req, res) => {
    const { recipientEmails, messageContent } = req.body;

    // Validate inputs
    if (!recipientEmails || recipientEmails.length === 0 || !messageContent) {
        return res.status(400).json(
            { error: 'Missing required fields' });
    }
    for (const email of recipientEmails) {
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: `Invalid email format: ${email}` });
        }
    }

    try {
        for (const email of recipientEmails) {
            await transporter.sendMail({
                from: process.env.EMAIL_USER, // Fixed sender email
                to: email,
                subject: `New Message from ${process.env.EMAIL_USER}`,
                template: 'messageTemplate', // Handlebars template
                context: {
                    sender: process.env.EMAIL_USER, // Static sender
                    message: messageContent,       // Dynamic content
                },
            });
        }

        res.status(200).json({ message: 'Emails sent successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send emails' });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
