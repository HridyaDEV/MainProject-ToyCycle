const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res) => {
    try {
        const { cartItems } = req.body;
        console.log("Received cart items:", cartItems);

        const line_items = cartItems.map(item => ({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: item.title,
                    image: item.imageUrl,
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
        });

        res.status(200).json({ url: session.url });
    } catch (error) {
        console.error('Stripe session error:', error.message);
        res.status(500).json({ error: 'Something went wrong' });
    }
};
