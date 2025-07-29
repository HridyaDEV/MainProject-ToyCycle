const express = require('express')
const { createCheckoutSession, stripeWebhook } = require('../Controllers/paymentController')
const router = express.Router()

router.post('/checkout-session', createCheckoutSession)


module.exports = router