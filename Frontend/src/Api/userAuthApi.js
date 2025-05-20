import axios from "axios";

const url = 'http://localhost:5113'

export const register = async(data) => {
    try {
        const response = await axios.post(`${url}/userAuth/register`, data)
        return response; 
    } catch (error) {
        throw error 
    }
}