import axios from "axios"

const url = "http://localhost:5115"

export const fetchDashboardCounts = async () =>{
    const response = await axios.get(`${url}/dashboard/counts`)
    return response.data
}