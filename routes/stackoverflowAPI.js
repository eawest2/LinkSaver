const axios = require("axios");
const router = require("express").Router();

router.get("/stackoverflow", (req, res) => {
  axios
//   req.params: key=U4DMV*8nvpm3EOpvf69Rxw((&site=stackoverflow&order=desc&sort=activity&q=react node foreach&filter=default
    .get("https://api.stackexchange.com/2.2/search/advanced?", { params: req.query })
    .then(({ data: { results } }) => res.json(results))
    .catch(err => res.status(422).json(err));
});

module.exports = router;
