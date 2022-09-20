const Post = require('../models/post')
const fs = require('fs')

//for get requests we pass value in res.json() and for post ,update and delete request we pass the values in its main element i.e for post we've , .create(value), for update -> findByIdAndUpdate(id, value)

//creating an api
//Writing methods for fetching , updating posts
module.exports = class API{
    //fetch all posts
    static async fetchAllPost(req,res){ //static agadi lekhyo vane call garda object banayera call garnu parddaina
        try{
            const post = await Post.find()      //will find from the Post collection from database
            res.status(200).json(post);         // ... and send it as the response
        }
        catch(err){
            res.status(404).json({ message: err.message })
        }
    }

    //fetch posts by id
    static async fetchPostByID(req,res){
        const id = req.params.id;
        try {
            const post = await Post.findById(id);
            res.status(200).json(post);
        }
        catch(err){
            res.status(404).json({message: err.message});
        }
    }
    
    //create a post
    static async createPost(req,res){
        const post = req.body; //inserting the data sent by client to post variable
        const imageName = req.file.filename;  //tracking the name of the file from the req body
        post.image = imageName // creating image property as image is a file that client will add and come in req body 
                               //But hamro schema maa we have image:String , so tesma name janxa  
        try{
            await Post.create(post) //creating a post request , client(post) with the schema(Post)
            res.status(200).json({ message: 'Posted succesfully ' })
        }
        catch(err){
            res.status(404).json({ message:err.message })
        }
    }

    //

    
    //update post
    static async updatePost(req,res){
        const id = req.params.id;
        let new_image = ""
        if(req.file){
            new_image = req.file.filename;
            try{                                                    //(old_image comes from req body of postman)
                fs.unlinkSync('./uploads/' + req.body.old_image);           //removing the old image to add the new image and tyo unlinksync ko vitra ko is path of the old file ,)
        }
        catch(err){
           console.log(err);
        }
    }
        else{
                new_image = req.body.old_image;     //while requesting for update to the id the req body send kk change garne vanera and it'll send the old image if the image is not changed.
        }
        //inserting new things that came in update
        const newPost = req.body;
        newPost.image = new_image //for fullfilling the schema pattern

        try{
            await Post.findByIdAndUpdate(id, newPost);  
            res.status(200).json("Post updated")
        }
        catch(err){
            res.status(404).json({ message:err.message })
        }
    }
    
    //delete post
    static async deletePost(req,res){
       const id = req.params.id;
       try{
         const result = await Post.findByIdAndDelete(id);
         if(result.image != ''){        //finds the id and observes the image porperty and if this is not empty
            try{
                fs.unlinkSync('./uploads/' + result.image)      //and removing the image from our uploads directory
            }
            catch(err){
                res.status(404).json({ message: err.message })
            }
         }
            res.status(200).json('Deleted successfully')
       }
       catch(err){
        res.status(404).json({ message: err.message })
    }
    }
}