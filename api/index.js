const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const eventRoute = require("./routes/Events")
const multer = require("multer");
const path = require("path");
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express');
dotenv.config();

app.use(express.json());
app.use("/images", express.static(path.join(__dirname,"/images")))


//Connecting mongodb
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log("Connected to MongoDB"))
.catch((err)=>console.log(err));

//Add images to local storage

const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,"images")
    },filename:(req,file,cb) =>{
        cb(null,req.body.name);
    },
});

const upload = multer({storage:storage});
app.post("/api/upload", upload.single("file"),(req,res)=>{
    res.status(200).json("file has been uploaded");
})

const swaggerOptions = {
    swaggerDefinition:{
        info:{
            title: "Group 27 API",
            description: "This is the back end routes for our project",
            contact:{
                name:"API support"
            },
            servers:["http://localhost:5000/"]

        }
    },
     // ['.routes/*.js']
    apis: ["index.js"]
}

const swaggerDocs= swaggerJsDoc(swaggerOptions);
// app.use('./api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
//Routes
/**
 * @swagger
 * /api/posts:
 *  get:
 *      description: Use to request all posts
 *      responses: 
 *          '200':
 *              description: 'A succesfull fetch'
 *  post:
 *      description: Use to update all posts
 *      responses:
 *          '200':
 *              description: 'A successfull update'

 */

app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/posts",postRoute);
app.use("/api/categories",categoryRoute);
app.use("/api/events",eventRoute);


//Local host port
app.listen("5000",()=>{
    console.log("Backend is running ...");
});
