const boilersTypeRouter = require("./boilersType");
const router = require("express").Router();

router.use("/boilersType", boilersTypeRouter);

module.exports = router;