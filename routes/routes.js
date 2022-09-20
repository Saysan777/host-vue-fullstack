const express = require('express');
const router = express.Router();
const API = require('../controllers/api');
const multer = require('multer');

//what is multer?
//-> Multer is a node. js middleware for handling multipart/form-data , which is primarily used for uploading files. 
// ->It is written on top of busboy for maximum efficienc

//multer middleware
let storage = multer.diskStorage({      //storing image uploads maa , db maa only storing the filename
    destination: function(req,file,cb){
        cb(null ,'./uploads')   //path always must be ./name , it will auto detect 
    },
    filename: function(req,file,cb){
        cb(null , file.fieldname ="_"+ Date.now() + "_"+ file.originalname )
    }
})

let upload = multer({
    storage: storage    //providing multer storage with our content
}).single('image');     //to upload single image with key value 'image'

//we only define routes here and call methods from controller to send response
// router.method('path','middleware', 'methods for paths')
router.get('/',API.fetchAllPost)
router.get('/:id',API.fetchPostByID);
router.post('/',upload,API.createPost)
router.patch('/:id',upload,API.updatePost)
router.delete('/:id',API.deletePost)

module.exports = router