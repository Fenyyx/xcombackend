import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongo DB conectado: ${conn.connection.host}`)
    }
    catch (error) {
        console.error(`Error connection to mongoDB: ${error.message}`)
        proces.exti(1)
    }
}

export default connectMongoDB