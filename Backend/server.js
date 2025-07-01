const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json()); // Must come before routes to parse req.body
app.use('/uploads', express.static('uploads')); // For image access

// Route imports
const userAuthRoute = require("./Routes/userAuthRoute");
const toyRoute = require("./Routes/toyRoute");
const userRoute = require("./Routes/userRoute");
const cartRoute = require("./Routes/cartRoute")
const favRoute = require("./Routes/FavRoute")
const CategoryRoute = require("./Routes/categoryRoute")

// Mount routes
app.use("/toy", toyRoute);
app.use("/userAuth", userAuthRoute);
app.use("/user", userRoute);
app.use("/cart", cartRoute)
app.use("/fav", favRoute)
app.use("/category", CategoryRoute)

// Database Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log(" Database Connected");
    } catch (error) {
        console.error("Database connection failed:", error.message);
    }
};

// Start the server
const PORT = process.env.PORT || 5117;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(` Server running on http://localhost:${PORT}`);
    });
});
