import userRoutes from './routes/users.js'
import apiRoutes from './routes/apiRouter.js'
import videoRouter from './routes/video.js'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import http from 'http'

const server = express()
server.use(bodyParser.urlencoded({extended: true}))
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

//לא נפתחת אפליקציית הreact
//לעשות את היוזר ואז אבין את הקטע אולי
//debug
//jwt
//נתיבים לדפים מהריאקט ואיך אני משנה אותם