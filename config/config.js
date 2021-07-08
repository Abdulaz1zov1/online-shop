const mongoose = require('mongoose')
const connectDB = async () => {
    const db = "mongodb://localhost:27017/electron"
    const conn = await mongoose.connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
};
module.exports = connectDB;