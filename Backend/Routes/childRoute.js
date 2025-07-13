const express = require("express");
const { addChild, getChildrenByParent } = require("../Controllers/childConroller");
const router = express.Router();

router.post("/add", addChild);
router.get("/parent/:id", getChildrenByParent);

module.exports = router;
