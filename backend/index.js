require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const { authenticateToken } = require("./utilities");

const User = require("./models/user.model");
const Contact = require("./models/contact.model"); 

mongoose.connect(config.connectionString);


const app = express();
app.use(express.json());
app.use(cors({origin: "*"}));

const transporter = nodemailer.createTransport({
    service: "Gmail", // or use 'SMTP' for custom email services
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASSWORD, // Your email password
    },
});

/* -----------------------------------
🧑‍💻 USER AUTHENTICATION ROUTES
----------------------------------- */
// Create Account
app.post("/create-account", async (req, res) => {
    const { fullName,email,password } = req.body;

    if (!fullName || !email || !password) {
        return res
            .status(400)
            .json({ error: true, message: "All fields are required "});
    }

    const isUser = await User.findOne({ email });
    if (isUser) {
        return res
            .status(400)
            .json({ error: true, message: "User already exists "});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User ({
        fullName,
        email,
        password: hashedPassword,
    });

    await user.save();

    const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "72h",
        }
    );

    return res.status(201).json({
        error: false,
        user: { fullName: user.fullName, email: user.email },
        accessToken,
        message: "Registration Sucessfull",
    });
});


// Login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and Password are Required"});
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json ({ message: "User not Found"});
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Inavalid Credentials" });
    }   

    const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "72h",
        }
    );

    return res.json({
        error: false,
        message: "Login Sucessfull",
        user: { fullName: user.fullName, email: user.email },
        accessToken,
    });
});


// Get User
app.get("/get-user",authenticateToken, async (req, res) => {
    const { userId } = req.user 

    const isUser = await User.findOne({ _id: userId});

    if (!isUser) {
        return res.sendStatus(401);
    }
    return res.json ({
        user: isUser,
        message: "",
    });
});


// Subscription Route
app.post("/api/subscribe", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: true, message: "Email is required." });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: true, message: "Invalid email format." });
    }

    // Sending a thank-you email
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Thank You for Joining Our Travel Community!",
            text: `Dear Traveler,\n\nThank you for joining our travel community at Praveen Randula Tourism Page. Stay tuned for exclusive deals and travel inspiration!\n\nWarm regards,\nThe Travel Team`,
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({
            error: false,
            message: "Subscription successful. A thank-you email has been sent!",
        });
    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ error: true, message: "Failed to send email." });
    }
});

/* -----------------------------------
📬 CONTACT FORM ROUTE
----------------------------------- */

// Submit Contact Form
app.post("/api/contact", async (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: true, message: "All required fields must be filled" });
    }

    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            message,
        });

        await newContact.save();
        return res.status(201).json({
            error: false,
            message: "Your message has been sent successfully!",
        });
    } catch (error) {
        console.error("Error saving contact form data:", error);
        return res.status(500).json({
            error: true,
            message: "Failed to submit the contact form.",
        });
    }
});


/* -----------------------------------
🚀 SERVER START
----------------------------------- */

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
