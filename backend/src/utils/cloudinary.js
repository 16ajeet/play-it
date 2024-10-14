import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'

cloudinary.config(
    {
        cloud_name: process.env.CLOUD_NAME,
        api_key : process.env.CLOUDINARY_API_KEY,  
        api_secret : process.env.CLOUDINARY_API_SECRET 
    }
)

const fileUploadOnCloudinary = async function(localFilePath){
    try {
        if(!localFilePath) return null
        cloudinary.uploader.upload('localFilePath', {
            resource_type : 'auto'
        })
    } catch (error) {
        fs.unlinkSync(localFilePath); //sync mtlb jb tk nhi hoga ye tb tk dusra process start nahi hoga
        return null
    }
    
}

export {fileUploadOnCloudinary}