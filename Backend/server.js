const express = require("express")
const app = express()
const cors= require('cors')
const dotenv = require('dotenv');

const mongoose = require('mongoose')

dotenv.config();

const userAuthRoute = require('./Routes/userAuthRoute')

app.use(cors())
app.use(express.json())

app.use('/userAuth',userAuthRoute)





const url = process.env.DB_URL
const connectDB = async () => {
    try {
        await mongoose.connect(url)
        console.log("Database Connected")
    } catch (error) {
        console.log('connection error', error);
    }
}

const PORT = process.env.PORT || 5115

connectDB().then(()=>{
    app.listen(PORT, () =>{
        console.log(`server listen ${PORT}`);
        
    })
})