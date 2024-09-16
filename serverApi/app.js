import userRoutes from './routes/users.js'
import apiRoutes from './routes/apiRouter.js'
import videoRouter from './routes/video.js'
import express from 'express'
import cors from 'cors'
// import bodyParser from 'body-parser'
import http from 'http'
import mongoose from 'mongoose'

const mongoURI = 'mongodb://localhost:27017/youtube'; 

// הגדרת חיבור Mongoose ל-MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB successfully!');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
});

const server = express()
//server.use(bodyParser.urlencoded({extended: true}))
server.use(express.urlencoded({ extended: true })); // טיפול בנתונים שמתקבלים בפורמט URL-encoded
server.use(express.json())
server.use(cors())



server.use(express.static('public'))

server.use("/api/users",userRoutes);
server.use("/api",apiRoutes)
server.use("/api/videos",videoRouter)



const server2 = http.createServer(server)

server2.listen(8000,()=>{
    console.log("listening port 8000");
})

