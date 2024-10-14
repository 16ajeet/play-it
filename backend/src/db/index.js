import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const DBconnection = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI} / ${DB_NAME}`)
        // console.log(`Database connected at host : ${connectionInstance.connection.host}`)

    } catch (error) {
       console.log(`ERROR in database conncetion : ${error}`);
        process.exit(1);
    }
    

}

export default DBconnection;