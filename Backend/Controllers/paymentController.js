const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const Order = require('../Models/order');

exports.createCheckoutSession = async (req, res) => {
  try {
    const { cartItems, userId } = req.body;

    const line_items = cartItems.map(item => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.title,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
      metadata: {
        cartItems: JSON.stringify(
          cartItems.map(i => ({ toyId: i._id, quantity: i.quantity }))
        ),
        userId,
      },
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe session error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

exports.stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook Error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    try {
      const cartItems = JSON.parse(session.metadata.cartItems);
      const userId = session.metadata.userId;

      const order = new Order({
        userId,
        items: cartItems,
        totalAmount: session.amount_total / 100,
        paymentStatus: 'Paid',
      });

      await order.save();
      console.log(' Order saved to DB');
    } catch (error) {
      console.error('Error saving order:', error);
    }
  }

  res.status(200).json({ received: true });
};
