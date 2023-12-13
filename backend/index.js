const express = require('express');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/adminRoutes');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const authenticateAdmin = require('./middleware/authMiddleware');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const { authenticateUser } = require('./middleware/authenticationMiddleware');



const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));
  


const DB_URI = 'mongodb+srv://admin:AAtdN0CdL4a6sBTG@cluster0.pl6yoop.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password', 
}, authenticateAdmin));

app.use('/api', adminRoutes);

app.use('/user', authRoutes);

app.get('/checkToken', authenticateUser, (req, res) => {
  res.status(200).json({ message: 'Token is valid' });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
