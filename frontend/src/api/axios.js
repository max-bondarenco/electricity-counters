import axios from 'axios'

const baseURL = 'http://localhost:1234/api'

export default axios.create({
    baseURL,
})
