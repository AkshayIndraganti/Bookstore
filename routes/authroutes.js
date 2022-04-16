const express = require('express');
const authController = require('../controllers/authController');

const router = express();

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);

// CRUD OPERATIONS (BOOK COLLECTION)
//Get
router.get('/bookcollection', authController.bookcollection_get);
router.get('/books', authController.bookcollection_getall);
router.get('/books/:id', authController.bookcollection_getone);
//Post
router.post('/bookstore', authController.bookstores_post);
//Put
router.get('/books/edit/:id', authController.bookstore_get);
router.put('/books/edit/:id', authController.bookstore_put);
//Delete
router.delete('/books/:id', authController.bookcollection_delete);

module.exports = router;
