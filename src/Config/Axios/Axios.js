const axios = require('axios');

export default axios.create({
    baseURL: 'http://192.168.0.36:8000/api'
});
