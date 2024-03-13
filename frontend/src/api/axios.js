import axios from 'axios'

const baseURL = 'https://electricity-counters.onrender.com/api'

export default axios.create({
    baseURL,
})
