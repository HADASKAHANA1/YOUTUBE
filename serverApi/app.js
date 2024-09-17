import userRoutes from './routes/users.js'
import apiRoutes from './routes/apiRouter.js'
import videoRouter from './routes/video.js'
import express from 'express'
import cors from 'cors'
// import bodyParser from 'body-parser'
import http from 'http'
import mongoose from 'mongoose'
import customENV from 'custom-env'

customENV.env('local','./config')
console.log(process.env.mongoURI)


// הגדרת חיבור Mongoose ל-MongoDB
mongoose.connect(process.env.mongoURI, {
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

server2.listen(process.env.PORT,()=>{
    console.log("listening port ",process.env.PORT);
})

