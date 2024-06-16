const express = require('express');
const app = express();
const bucketRoutes = require('./routes/bucket');
const fileRoutes = require('./routes/file');
const userRoutes = require('./routes/user')
const userAuth = require('./middlewares/auth')
const { PORT } = require('./config');
const connectDB = require('./config/mongo');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(async () => {
    try{
       await connectDB()
    }catch(error) {
        console.error('Fatal Error: Unable to connect to MongoDB', error);
        process.exit(1)
    }
})()

app.use('/buckets', userAuth, bucketRoutes);
app.use('/buckets', userAuth, fileRoutes);
app.use('/user', userRoutes)

module.exports = app;
