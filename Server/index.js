const express = require("express")
const dotenv = require("dotenv")
const dbConnect = require('./connection')
const authRouter = require('./routers/authRouter')
const userRouter = require('./routers/userRouter')
const postRouter = require('./routers/postsRouter')
const cookieParser = require('cookie-parser')
const cors = require("cors")
const cloudinary = require('cloudinary').v2;

dotenv.config('./.env')

          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const PORT = process.env.PORT || 4001;
const app = express();

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}))
app.use(express.json({limit : '10mb'}));
app.use(cookieParser());
app.use('/auth', authRouter);
app.use('/post', postRouter)
app.use('/user',userRouter)
dbConnect();
app.listen(PORT,
    console.log('Server started : ', `http://localhost:${PORT}`)
)