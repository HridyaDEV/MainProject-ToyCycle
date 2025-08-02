// src/Api/paymentApi.js
import axios from 'axios';

const url = "http://localhost:5115";

export const createCheckoutSession = async (cartItems, userId) => {
  try {
    const response = await axios.post(`${url}/payment/checkout-session`, {
      cartItems: cartItems.map(item => ({
        _id: item._id,        
        title: item.title,
        price: item.price,
        quantity: item.quantity || 1,
      })),
      userId: userId           
    });
    return response.data;
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    throw error;
  }
};

