const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const dotenv = require('dotenv');
const path = require('path');

const authRoutes = require('./routes/authroutes');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

dotenv.config({ path: './config/config.env' });

// middleware
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));

// view engine
app.set('view engine', 'ejs');

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => app.listen(process.env.PORT || 5000))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/bookstore', (req, res) => res.render('bookstore'));
app.get('/bookstore', requireAuth, (req, res) => res.render('bookstore'));

app.use(authRoutes);
