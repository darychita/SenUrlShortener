import fetchWithAuth from '../helpers/fetchWithAuth';
import fetchWithBody from '../helpers/fetchWihBody';

export async function createLink(body, isAuthenticated) {
    let url = '/link';
    if(isAuthenticated) {
        url += '/extended';
    }
    let resp;
    try {
        resp = await fetchWithAuth(url, 'POST', body); 
        console.log(resp);
        const respBody = await resp.json();
        if (resp.ok) {
            return Promise.resolve(respBody);
        }

        return Promise.reject(respBody);
    } catch(e) {
        console.log(e);
        return Promise.reject(e);
    }
}

export async function getLink(endpoint, password) {
    const url = `/${endpoint}`;
    try {
        let resp = await fetchWithBody(url, { password });
        let body = await resp.json();
        if (resp.ok) {
            return Promise.resolve(body.origin);
        }
        console.log('ohdw')
        return Promise.reject(body.message);
    } catch(e) {
        console.log(e);
        return Promise.reject('Oops, something went wrong...');
    }
} 