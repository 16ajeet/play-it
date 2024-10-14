import multer from "multer";

const storage = multer.diskStorage({
    destination:function (req, file,cb) {
        cb(null, './public/temp')
    },
    filename : function(req,file,cb) {
        cb(null, file.originalname)     //upload the file with name that user have set
    }
});

export const uploadUsingMulter = multer({
    storage,
})