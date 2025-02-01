const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/auth');
const resumeRoutes = require('./routes/resume')
const cookieParser = require('cookie-parser');
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const path = require("path");

dotenv.config();
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));    
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB is connected.."))
    .catch((err) => console.log(err))

app.get('/', (req, res) => res.send('API is running'))

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,       
    api_secret: process.env.API_SECRET, 
  });

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "Resume", 
        allowed_formats: ["jpg", "png", "jpeg", "mp4"], 
    },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
    console.log("dffdf", req.data); 
    res.status(200).json({
        message: "File uploaded successfully",
        url: req.file.path, 
    }); 
});

app.use('/api/users', userRoutes);
app.use('/api/resume', resumeRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
console.log(`Running in ${process.env.NODE_ENV} mode`);