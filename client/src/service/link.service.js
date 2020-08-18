import fetchWithAuth from '../helpers/fetchWithAuth';

export async function createLink(body, isAuthenticated) {
    let url = '/link';
    if(isAuthenticated) {
        url += '/extended';
    }
    let resp;
    try {
        resp = await fetchWithAuth(url, 'POST', body); 
        return resp.json();
    } catch(e) {
        console.log(e);
        return resp.json();
    }
}