const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/auth');
const resumeRoutes = require('./routes/resume')
const cookieParser = require('cookie-parser');

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

app.use('/api/users', userRoutes);
app.use('/api/resume', resumeRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
console.log(`Running in ${process.env.NODE_ENV} mode`);