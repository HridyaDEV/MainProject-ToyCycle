const express = require("express");
const { addChild, getChildrenByParent, updateChild } = require("../Controllers/childConroller");
const router = express.Router();

router.post("/add", addChild);
router.get("/parent/:id", getChildrenByParent);
router.put("/:id",  updateChild);               


module.exports = router;
