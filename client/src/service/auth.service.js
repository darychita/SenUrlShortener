import { saveToken, deleteToken } from '../helpers/tokens';
import postFetch from '../helpers/postFetch';
// const baseURL = 'http://localhost:3000/';

export async function login(email, password) {
    try {
        const rawBody = { email, password };
        const resp = await postFetch(`/login`, rawBody);
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
        console.log(e);
        return { error: true };
    }   
}

export async function logout() {
    deleteToken();
}