import express from 'express'
import cors from "cors"
import cookieParser from "cookie-parser"
import { userRouter } from './routes/user.routes.js';
const app = express();

app.get('/', (req, res) => {
    res.send("welcome") 
})

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(express.json({
    limit : "16kb"
}))

app.use(express.urlencoded({
    extended : true,
    limit : "16kb"
}))

app.use(express.static('/public'))

app.use(cookieParser())

//implementing router
app.use('/api/v1/routes', userRouter)

export {app}