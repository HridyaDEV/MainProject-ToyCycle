import axios from "axios";

const url = 'http://localhost:5115'

export const register = async(data) => {
    try {
        const response = await axios.post(`${url}/userAuth/register`, data)
        return response; 
    } catch (error) {
        throw error 
    }
}

export const login = async(data)=>{
    try {
        const response= await axios.post(`${url}/userAuth/login`,data)
        return response
    } catch (error) {
        throw error
    }
}