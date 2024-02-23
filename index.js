const express = require("express");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const morgan = require("morgan");
const helmet = require('helmet');
const authRouter = require('./routes/auth');
const notesRouter = require('./routes/notes');

const app = express();
dotenv.config();

// Add middleware
app.use(express.json());
app.use(morgan("common"));
app.use(helmet());

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log(error);
    });

// Routes
app.use("/api/auth", authRouter);
app.use("/api/notes", notesRouter);

app.get("/notes", (req, res) => {
    res.send("Notes fetched successfully");
});

app.listen(3000, () => {
    console.log("App is running on port"+3000);
});
