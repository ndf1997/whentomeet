const axios = require('axios');
const baseUrl = "https://rvpqx6w707.execute-api.us-east-2.amazonaws.com/dev/";

test('meeting object is created', async() => {
    expect.assertions(2);
    const url = baseUrl + 'meeting';
    const meeting = {
        "meeting_id": "1",
        "description": "1",
        "location": "1",
        "title": "1"
    };
    const query = {
        meeting_id: 1
    }
    try {
        const postResponse = await axios.post(url, meeting);
        expect(postResponse.status).toBe(200);
        const getResponse = await axios.get(url, { params: query });
        expect(getResponse.data.Item).toEqual(meeting);
    } catch (e) {
        console.log(e);
    }
});

test('get returns status 400 if empty meeting_id', async() => {
    expect.assertions(2);
    const url = baseUrl + 'meeting';
    const meeting = {
        "meeting_id": "1",
        "description": "1",
        "location": "1",
        "title": "1"
    };
    const query = {
        meeting_id: ""
    }
    try {
        const postResponse = await axios.post(url, meeting);
        expect(postResponse.status).toBe(200);
        const getResponse = await axios.get(url, { params: query });
        expect(getResponse.status).toBe(400);
    } catch (e) {
        console.log(e);
    }
});

test('get returns status 404 if meeting_id does not exist', async() => {
    expect.assertions(2);
    const url = baseUrl + 'meeting';
    const meeting = {
        "meeting_id": "1",
        "description": "1",
        "location": "1",
        "title": "1"
    };
    const query = {
        meeting_id: "2"
    }
    try {
        const postResponse = await axios.post(url, meeting);
        expect(postResponse.status).toBe(200);
        const getResponse = await axios.get(url, { params: query });
        expect(getResponse.status).toBe(404);
    } catch (e) {
        console.log(e);
    }
});