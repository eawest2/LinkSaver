const db = require("../models");

// Defining methods for the UserFolderController
module.exports = {
  returnAllUserFolders: function(req, res) {
    db.UserFolder
      .find({})
      .sort({ name: 1 })
      .then(dbUserFolder => res.json(dbUserFolder))
      .catch(err => res.status(400).json(err));
  },
  returnUsersFolders: function(req, res) {
    db.UserFolder
      .findOne(req.params.id)
      .then(dbUserFolder => res.json(dbUserFolder))
      .catch(err => res.status(400).json(err));
  },
  returnFoldersUsers: function(req, res) {
    db.UserFolder
      .findOne(req.params.id)
      .then(dbUserFolder => res.json(dbUserFolder))
      .catch(err => res.status(400).json(err));
  },
  createUserFolder: function(req, res) {
    db.UserFolder
      .create(req.body)
      .then(dbUserFolder => res.json(dbUserFolder))
      .catch(err => res.status(400).json(err));
  },
  addUserToFolder: function(req, res) {
    db.UserFolder
      .findOneAndUpdate({ _id: req.params.id }, req.body, {new: true})
      .then(dbUserFolder => res.json(dbUserFolder))
      .catch(err => res.status(400).json(err));
  },
  // updateUserFolder: function(req, res) {
  //   db.UserFolder
  //     .findOneAndUpdate({ _id: req.params.id }, req.body, {new: true})
  //     .then(dbUserFolder => res.json(dbUserFolder))
  //     .catch(err => res.status(400).json(err));
  // },
  deleteUserFolder: function(req, res) {
    db.UserFolder
      .findById({ _id: req.params.id })
      .then(dbUserFolder => dbUserFolder.remove())
      .then(dbUserFolder => res.json(dbUserFolder))
      .catch(err => res.status(400).json(err));
  }
};
