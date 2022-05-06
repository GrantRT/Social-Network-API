const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-media-api', {});

mongoose.set('debug', true);

app.listen(PORT, () => console.log(`Social Media API is connected on localhost:${PORT}`));
