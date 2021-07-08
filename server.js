require('dotenv').config();
const express=require('express')
const mongoose=require('mongoose')
const cors = require('cors')
const fileupload = require('express-fileupload')
const cookieParser=require('cookie-parser');
 const connectDB=require('./config/config')
const path = require('path')
connectDB();


const app=express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(fileupload({
    useTempFiles:true
}))

//Connect to mongodb

// const URI=process.env.MONGODB_URL

// mongoose.connect(URI, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
// }, err =>{
//     if(err) throw err;
//     console.log('Connected to MongoDB')
// })



// Routes
app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/categoryRouter'))
app.use('/api', require('./routes/upload'))
app.use('/api', require('./routes/productRouter'))
app.use('/api', require('./routes/paymentRouter'))

if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'))
    app.get('*', (req,res) =>{
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}


const PORT=5001;

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})

