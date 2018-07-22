const db = require("../models");

// Defining methods for the UserController
module.exports = {
  returnAllUsers: function(req, res) {
    db.User
      .find({})
      .sort({ email: 1 })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(400).json(err));
  },
  returnUser: function(req, res) {
    db.User
      .findById(req.params.id)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(400).json(err));
  },
  createUser: function(req, res) {
    // const newUser = {
    //   email: req.body.email,
    //   name: req.body.name
    // };
    db.User
      .create(req.body)
      .then(dbuser => res.json(dbuser))
      .catch(err => res.status(400).json(err));
  },
  updateUser: function(req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(400).json(err));
  },
  deleteUser: function(req, res) {
    db.User
      .findById({ _id: req.params.id })
      .then(dbUser => dbUser.remove())
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(400).json(err));
  }
};
