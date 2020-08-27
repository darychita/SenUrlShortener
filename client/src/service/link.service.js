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
        return Promise.reject(body.message);
    } catch(e) {
        return Promise.reject('Oops, something went wrong...');
    }
} 

export async function deleteLink(uuid) {
    try {
        let resp = await fetchWithAuth(`/link/${uuid}`, 'DELETE');
        if (resp.status == 204) {
            return Promise.resolve();
        }
        return Promise.reject();
    } catch (e) {
        return Promise.reject('Oops, something went wrong...');
    }
}

export async function updateLink(uuid, updateSet) {
    try {
        const resp = await fetchWithAuth(`/link/${uuid}`, 'PATCH', updateSet);
        if (resp.ok) {
            return Promise.resolve();
        }
        const body = await resp.json();
        return Promise.reject(body);
    } catch(e) {
        return Promise.reject('Oops, something went wrong...');
    }
}