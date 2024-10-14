import { asyncHandler } from "../utils/asyncHandler.js";
import { HandleAPIError } from "../utils/APIError.js";
import { User } from "../models/user.models.js";
import { fileUploadOnCloudinary } from "../utils/cloudinary.js";
import { APIResponse } from "../utils/APIResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  //get data from frontend
  //validate if user already exists
  //check for empty fields or improper format
  //upload to cloudinary, validate
  //create an object with data recieved
  //connect to db and create a user there

  const { userName, email, password, fullName } = req.body;

  //checking if none of the input fields r empty
  const fields = { userName, email, password, fullName };

  for (const [key, value] of Object.entries(fields)) {
    if (!value) {
      throw new HandleAPIError(400, `${key} is required`);
    }
  }

  (email) => {
    const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegEx.test(email))
      throw new HandleAPIError(401, "email is invalid");
  };

  //finding if user exists or not; readablility of code is not good
  if (
    User.findOne({
      $or: [email, userName, fullName],
    })
  )
    throw new HandleAPIError(
      409,
      "user already exists, please login using your credentials"
    );

  //getting from multer  
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) throw new HandleAPIError(410, "avatar is required");

  //uploading on cloudinary
  const avatar = await fileUploadOnCloudinary(avatarLocalPath);
  const coverImage = await fileUploadOnCloudinary(coverImageLocalPath);

  if (!avatar) throw new HandleAPIError(401, "avatar uploading failed");

  const user = await User.create( {
    userName : userName.toLowerCase(),
    fullName,
    email,
    password,
    avatar : avatar.url,
    coverImage : coverImage.url || "",
  })

  const createdUser = User.findById(user._id).select("-passowrd -refreshToken")

  if(!createdUser) {
    throw new HandleAPIError(500, "could not create user, try again");
    
  }

  res.status(201).json(
    new APIResponse(200, createdUser, "registration successful")
  )
});
 
export { registerUser };


  //checking validity of mail
  //this method protect from temp mail but cant save u from the valid mails which r not listed
  //    const validMailList = {
  //         "yahoo" : "@yahoo",
  //         "gmail" : "@gmail",
  //         "hotmail" : "@hotmail",
  //         "outlook" : "@outlook",
  //         "outlook_live" : "@live",
  //         "zoho" : "@zoho"
  //     }

  //     const isValidMail = false

  //     for (const [key, value] of Object.entries(validMailList)) {
  //         if(email.includes(value)) isValidMail = true;
  //         break;
  //     }

  //     if(!isValidMail) {
  //         throw new HandleAPIError(400, "email is invalid, please use gmail, yahoo, hotmail, outlook or zoho");

  //     }

  //most used email validation approach but it is vulnerable to temp mails
