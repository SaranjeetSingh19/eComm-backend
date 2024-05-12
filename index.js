import path from "path"
import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import {connectDb} from "./config/db.js"
import userRoutes from "./routes/user.route.js"

dotenv.config();

const port =  process.env.PORT || 5000

connectDb()

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())


// app.get("/", (req,res) => {
//     res.send("Uffff")
// })
app.use("/api/users", userRoutes)

app.listen(port, ()=> {
    console.log(`Servr is running on Port: ${port}`);
})