const router = require("express").Router();
const foldersController = require("../controller/foldersController");
const userFolderController = require("../controller/UserFolderController");
const users = require("../controller/usersController");

router.route("/")
  .get(foldersController.returnAllFolders);


  module.exports = router;

// router.route.get("/api/user/:id", function (req, res) {
//     let firstReturn;
//     user.returnUser(req.params.id).then(result => {
//         console.log(result);
//         firstReturn = result;
//     })
//     let secondReturn;
//     userFolder.returnUserFolder(req.params.id).then(result => {
//         console.log(result);
//         secondReturn = result;
//     })
//     setTimeout(combineUser(firstReturn,secondReturn), 1000)
// });

// router.route.get("/api/folder/:id", function (req, res) {
// userFolder.returnFolder(req.params.id).then(result => {
//     console.log(result);
//     res.json({ result })
// })
// });

// router.route.get("/api/folder/:id", function (req, res) {
// userFolder.returnFolder(req.params.id).then(result => {
//     console.log(result);
//     res.json({ result })
// })
// });
// export default Router;
