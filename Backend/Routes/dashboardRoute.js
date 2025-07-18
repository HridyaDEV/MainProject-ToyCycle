const express = require("express")
const { getDashboardCounts } = require("../Controllers/dashboardController")
const router = express.Router()

router.get("/counts",getDashboardCounts)

module.exports = router