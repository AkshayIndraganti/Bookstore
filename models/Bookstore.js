const mongoose = require('mongoose');

const bookstoreSchema = new mongoose.Schema(
  {
    bookname: {
      type: String,
      required: [true, 'Please Enter An Bookname'],
    },
    author: {
      type: String,
      required: [true, 'Please Enter An Author'],
    },
    language: {
      type: String,
      required: [true, 'Please Enter An Language'],
    },
    pages: {
      type: Number,
      required: [true, 'Please Enter An Pages'],
    },
  },
  { timestamps: true }
);

const Bookstore = mongoose.model('Bookstore', bookstoreSchema);

module.exports = Bookstore;
