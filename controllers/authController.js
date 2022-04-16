const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Bookstore = require('../models/Bookstore');

// Catch Error
const handleErrors = (err) => {
  let errors = { firstname: ' ', email: ' ', password: ' ' };

  //In correct email
  if (err.message === 'incorrect email') {
    errors.email = 'Email is not registered';
  }
  //In password password
  if (err.message === 'incorrect password') {
    errors.password = 'Password  is incorrect';
  }
  //Duplicate error code
  if (err.code === 11000) {
    errors.email = ' Email is already registered';
    return errors;
  }

  //Validation error
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

//create Tokens
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'the akshay secret', {
    expiresIn: maxAge,
  });
};

// Get signup
module.exports.signup_get = (req, res) => {
  res.render('signup');
};

// Get Login
module.exports.login_get = (req, res) => {
  res.render('login');
};

// SIGN UP
module.exports.signup_post = async (req, res) => {
  const { firstname, email, password } = req.body;

  try {
    const user = await User.create({ firstname, email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

//LOG  IN  PAGE
module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

// CRUD OPERATIONS
module.exports.bookcollection_get = (req, res) => {
  res.render('bookstore');
};

//Get All
module.exports.bookcollection_getall = (req, res) => {
  Bookstore.find()
    .then((result) => {
      res.render('bookcollection', {
        title: 'Bookstore',
        bookstores: result,
      });
    })

    .catch((err) => {
      console.log(err);
    });
};

//Get one
module.exports.bookcollection_getone = (req, res) => {
  Bookstore.findById()
    .then((result) => {
      res.render('bookcollection', { title: 'Bookstore', bookstores: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

//Post
module.exports.bookstores_post = (req, res) => {
  let newBookstore = new Bookstore(req.body);
  newBookstore
    .save()
    .then((result) => {
      res.redirect('/books');
      console.log(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

//Get Book
module.exports.bookcollection_getone = (req, res) => {
  const id = req.params.id;
  Bookstore.findById(id)
    .then((result) => {
      res.render('details', { bookstore: result, title: 'book details' });
    })
    .catch((err) => {
      res.send(err);
    });
};
//get page for put request
module.exports.bookstore_get = (req, res) => {
  const id = req.params.id;
  Bookstore.findById(id)
    .then((result) => {
      res.render('edit', { bookstore: result, title: 'book details' });
    })
    .catch((err) => {
      res.send(err);
    });
};

//Put
module.exports.bookstore_put = (req, res) => {
  const id = req.params.id;
  Bookstore.findByIdAndUpdate(id, req.body)
    .then((result) => {
      res.redirect('/books');
    })
    .catch((err) => {
      console.log(err);
    });
};

//Delete
module.exports.bookcollection_delete = (req, res) => {
  const id = req.params.id;
  Bookstore.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: '/books' });
    })
    .catch((err) => {
      console.log(err);
    });
};

//LOG OUT
module.exports.logout_get = (req, res) => {
  res.cookie('jwt', ' ', { maxAge: 1 });
  res.redirect('/');
};
