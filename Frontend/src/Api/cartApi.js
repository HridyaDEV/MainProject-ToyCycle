import axios from "axios";

const url = "http://localhost:5115";

export const addToCart = async (toyId, quantity, token) => {
    return await axios.post(`${url}/cart/add`, { toyId, quantity }, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const getCartItems = async (token) => {
    const res = await axios.get(`${url}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.items;
};

export const removeFromCart = async (toyId, token) => {
    return await axios.delete(`${url}/cart/${toyId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
