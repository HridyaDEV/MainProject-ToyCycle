const express = require("express");
const app = express();
const http = require("http")
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const {Server} = require("socket.io")
const socketConnection = require("./socket")

dotenv.config();

const server =http.createServer(app)

//Socket.IO Setup
const io= new Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
})
socketConnection(io)

// Middleware
app.use(cors());

const paymentRoute = require('./Routes/paymentRoute')
const webhookRoute = require('./Routes/webhookRoute'); 
// Mount webhook route *before* express.json()
app.use('/payment/webhook', express.raw({ type: 'application/json' }), webhookRoute);

app.use(express.json()); 
app.use('/uploads', express.static('uploads')); // For image access



// Route imports
const userAuthRoute = require("./Routes/userAuthRoute");
const toyRoute = require("./Routes/toyRoute");
const userRoute = require("./Routes/userRoute");
const cartRoute = require("./Routes/cartRoute")
const favRoute = require("./Routes/FavRoute")
const CategoryRoute = require("./Routes/categoryRoute")
const vaccineRoute = require("./Routes/vaccineRoute")
const childRoute = require("./Routes/childRoute")
const chatRoute = require("./Routes/chatRoute")
const dashboardRoute = require("./Routes/dashboardRoute")


// Mount routes
app.use("/toy", toyRoute);
app.use("/userAuth", userAuthRoute);
app.use("/user", userRoute);
app.use("/cart", cartRoute)
app.use("/fav", favRoute)
app.use("/category", CategoryRoute)
app.use("/vaccine",vaccineRoute)
app.use("/child",childRoute)
app.use("/chat",chatRoute)
app.use("/dashboard", dashboardRoute)
app.use('/payment', paymentRoute); // This handles /payment/checkout-session



// Database Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log(" Database Connected");
    } catch (error) {
        console.error("Database connection failed:", error.message);
    }
};

require('./jobs/reminderJob')

// Start the server
const PORT = process.env.PORT || 5117;
connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(` Server + socket.IO running at http://localhost:${PORT}`);
    });
});
