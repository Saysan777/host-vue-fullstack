require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT

//middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));


//database connections
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useFindAndModify: true,
}).then(()=>{
    console.log('Connected to the database');
})
.catch((err)=>{
    console.log(err.message);
})

// routes prefix
app.use('/api/post',require('./routes/routes'));

// we're doing this because after we hit npm run build it creates a dist folder in client and then we check if NODE_ENV (node enviroment)  is production or not if yes we provide the path of that dist file and send the index.html file
//..after that we copy that dist folder and paste it in Server directory , so that our file stays in server,i.e just cut the dist folder from client to Server
if(process.env.NODE_ENV == 'production'){
    app.use(express.static(__dirname+'/dist/'));
    app.use('*',(req,res)=>{
        res.sendFile(__dirname + "/dist/index.html");
    })
}

app.listen(port, ()=> console.log(`server started at ${port}`))
