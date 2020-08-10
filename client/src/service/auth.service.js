import { saveToken, deleteToken } from '../helpers/tokens';

// const baseURL = 'http://localhost:3000/';

export async function login(email, password) {
    try {
        const resp = await fetch(`/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
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