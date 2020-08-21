function fetchWithBody(url, body, method = 'POST') {
    return fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        redirect: 'manual'
    });
}

export default fetchWithBody;
