import axios from 'axios'
const instance = axios.create({
    baseURL: 'https://opentdb.com/',
    headers: {
        "content-type": "application/json"
    }
})

export default instance;