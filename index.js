const express = require("express");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");
const urlRoute = require("./routes/url");

const app = express();
const PORT = 8000;

// Connect to MongoDB
connectToMongoDB("mongodb://localhost:27017/short-url")
    .then(() => {
        console.log('MongoDB connected');
        // Start the server after MongoDB connection is established
        app.listen(PORT, () => console.log(`Server started at ${PORT}`));
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

// Middleware
app.use(express.json());

// Routes
app.use("/url", urlRoute);

// Route for redirecting short URLs
app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    try {
        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                    },
                },
            }
        );
        if (entry) {
            res.redirect(entry.redirectURL);
        } else {
            res.status(404).send("URL not found");
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});
