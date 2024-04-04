const express = require("express")
const dotenv = require("dotenv")
const dbConnect = require('./connection')
const authRouter = require('./routers/authRouter')
const userRouter = require('./routers/userRouter')
const postRouter = require('./routers/postsRouter')
const cookieParser = require('cookie-parser')
const cors = require("cors")

dotenv.config('./.env')
const PORT = process.env.PORT || 4001;
const app = express();

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}))
app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRouter);
app.use('/post', postRouter)
app.use('/user',userRouter)
dbConnect();
app.listen(PORT,
    console.log('Server started : ', `http://localhost:${PORT}`)
)