const express = require('express');
const app = express();
const bucketRoutes = require('./routes/bucket');
const fileRoutes = require('./routes/file');
const { PORT } = require('./config');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/buckets', bucketRoutes);
app.use('/buckets', fileRoutes);

module.exports = app;
