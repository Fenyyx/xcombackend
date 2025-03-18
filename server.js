import express from "express"
import authRoutes from "./routes/auth.routes.js"
import dotenv from "dotenv"
import connectMongoDB from "./db/connectMongoDB.js"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/user.routes.js"
import {v2 as cloudinary} from "cloudinary"
import postRoutes from "./routes/post.routes.js"
import notificationRoutes from "./routes/notification.route.js"
import cors from "cors"


dotenv.config()

console.log(process.env.CLOUDINARY_CLOUD_NAME);
console.log(process.env.CLOUDINARY_API_KEY);
console.log(process.env.CLOUDINARY_API_SECRET);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})


const app = express()
const PORT = process.env.PORT || "http://localhost:3000"


app.use(
    cors({
      origin: 'https://xcom3.netlify.app',
      credentials: true,  // Esto permite el uso de cookies
    })
  );


  

app.use(express.json())
app.use(express.urlencoded({extended: true})) //Para usar la versión abreviada en Postman

app.use(cookieParser())

app.use("/api/notifications", notificationRoutes);
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)

app.listen(PORT, () => {
    console.log(`server en el puerto ${PORT}`)
    connectMongoDB()
})