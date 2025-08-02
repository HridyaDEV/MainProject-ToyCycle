// webhookRoute.js
const express = require('express');
const { stripeWebhook } = require('../Controllers/paymentController');
const router = express.Router();

router.post('/', stripeWebhook);

module.exports = router;
