import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";
import { userLogin } from "../controllers/login.controllers.js";
import { uploadUsingMulter } from "../middlewares/multer.middlewares.js";


const userRouter = Router();

    userRouter.route('/register').post(
        uploadUsingMulter.fields([      //middleware to check if avatar and coverimage r present or not
            {
                name : "avatar",
                maxCount : 1
            },{
                name : "coverImage",
                maxCount : 1
            }
        ]),
        registerUser
    );
    userRouter.route('/login').post(userLogin)


export {userRouter}