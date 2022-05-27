const axios = require('axios');
const API = 'http://localhost:6969/api/videos/'

export async function getHistory() {
    let res = await axios.get(API)
    return res.data;
}

export async function getMoreHistory(id) {
    let res = await axios.get(API + id);
    return res.data;
}

export async function addVideo(url) {
    let res = await axios.post(API, {
        url: url
    });

    return res.data;
}