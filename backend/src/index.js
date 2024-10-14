

import * as dotenv from 'dotenv'
import DBconnection from './db/index.js'
import { app } from './app.js'
// import 'dotenv/config'

// dotenv.config();
dotenv.config({
    path : './.env'
})
// console.log(process.env.MONGODB_URI);
// console.log(process.env.PORT);



// require('dotenv').config()



DBconnection()
.then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`port is listening at http://localhost:${process.env.PORT}`);
    
  })
})
.catch((error) => {
  console.log(`DB connection failed, error : ${error}`);
  throw error;
  
})































// -----------------------------------------------------------------------
/*
const app = express();

;(async () => {
    try {
      await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) 
      app.on("error", (error) => {
        console.log(`ERROR code : ${error}`);
        throw error;
        
      })

      app.listen(process.env.PORT, () => {
        console.log(`listening on http://localhost:${process.env.PORT}`);
        
      })
    } catch (error) {
       console.log(`Error is : ${error}`);
        throw error
    }
})()

*/