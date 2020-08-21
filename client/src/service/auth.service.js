import { saveToken, deleteToken, getTokenData } from '../helpers/tokens';
import fetchWithBody from '../helpers/fetchWihBody';
// const baseURL = 'http://localhost:3000/';

export async function login(email, password) {
    try {
        const rawBody = { email, password };
        const resp = await fetchWithBody('/login', rawBody);
        const body = await resp.json();
        if (resp.status !== 200) {
            return {
                error: true, 
                ...body
            };
        }
        saveToken(body);
        return {};
    } catch(e) {
        return { error: true };
    }   
}

export async function updateToken() {
    try {
        const { refreshToken } = getTokenData();
        const resp = await fetchWithBody('/token/update', { token: refreshToken }, 'PATCH');
        if (resp.status != 200) {
            return Promise.reject();
        }
        const tokenData = await resp.json();
        saveToken({ ...tokenData, refreshToken });
        return Promise.resolve(tokenData);
    } catch(e){}
}

export function logout() {
    const { refreshToken } = getTokenData();
    return fetchWithBody('/logout', { token: refreshToken }, 'DELETE')
            .then(deleteToken);
    // return fetch('/logout', {
    //     method: 'DELETE',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ token: refreshToken })
    // }).then(() => deleteToken());
}