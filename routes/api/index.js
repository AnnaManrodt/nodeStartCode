const router = require("express").Router();
const customerRoutes = require("./customer");


router.use("/customer", customerRoutes)


module.exports = router;