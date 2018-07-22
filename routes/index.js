// export { default } from "./routes.js";


const router = require("express").Router();
const routesRoutes = require("./routes");

// beer routes
router.use("/routes", routesRoutes);

module.exports = router;