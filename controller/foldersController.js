const db = require("../models");

// Defining methods for the FolderController
module.exports = {
 
  returnAllFolders: function(req, res) {
    db.Folder
      .find({})
      .sort({ name: 1 })
      .then(dbFolder => res.json(dbFolder))
      .catch(err => res.status(400).json(err));
  },
  returnFolder: function(req, res) {
    db.Folder
      .findById(req.params.id)
      .then(dbFolder => res.json(dbFolder))
      .catch(err => res.status(400).json(err));
  },
  createFolder: function(req, res) {
    db.Folder
      .create(req.body)
      .then(dbFolder => res.json(dbFolder))
      .catch(err => res.status(400).json(err));
  },
  addLink: function(req, res) {
    db.Folder
      .findOneAndUpdate({ _id: req.params.id }, req.body, {new: true})
      .then(dbFolder => res.json(dbFolder))
      .catch(err => res.status(400).json(err));
  },
  // updateFolder: function(req, res) {
  //   db.Folder
  //     .findOneAndUpdate({ _id: req.params.id }, req.body, {new: true})
  //     .then(dbFolder => res.json(dbFolder))
  //     .catch(err => res.status(400).json(err));
  // },
  deleteFolder: function(req, res) {
    db.Folder
      .findById({ _id: req.params.id })
      .then(dbFolder => dbFolder.remove())
      .then(dbFolder => res.json(dbFolder))
      .catch(err => res.status(400).json(err));
  }
};
