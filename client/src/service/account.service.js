import fetchWithBody from '../helpers/fetchWihBody';
import fetchWithAuth from '../helpers/fetchWithAuth';
import * as tokens from '../helpers/tokens';

export async function register(username, email, password) {
    try {
        const body = { username, email, password };
        const resp = await fetchWithBody('/register', body);
        console.log(resp.status);
        if (resp.status == 201) {
            return { message: 'Activation email sent to your email. Please, check input'};
        }
        const respBody = await resp.json();
        return {
            error: true,
            ...respBody
        }
    } catch(e) {
        console.log(e.message);
    }
}

export async function confirmRegistration(token) {
    try {
        const response = await fetch(`/register/confirm/${token}`);
        const body = await response.json();
        return body;
    } catch(e) { 
        console.log(e);
    }
}

export async function resetPasswordRequest(email) {
    try {
        const response = await fetchWithBody('/reset', { email });
        const body = await response.json();
        if (!response.ok) {
            return {
                error: true,
                ...body
            }
        }
        return body;
    } catch(e) {

    }
}

export async function resetTokenExists(token) {
    try {
        const response = await fetch(`/reset/${token}`);
        if(!response.ok) {
            return {
                error: true,
                ...(await response.json()) 
            }
        }
        return {};
    } catch(e) {}
}

export async function resetPasswordConfirm(token, password) {
    try {
        const response = await fetchWithBody(`/reset/${token}`, { password });
        const body = await response.json();
        if (!response.ok) {
            return {
                error: true,
                ...body
            }
        }
        return body;

    } catch(e) {}
}


export async function updatePassword(password) {
    try {
        const response = await fetchWithAuth('/user/password','PATCH', { password });
        const body = await response.json();
        if (response.ok) {
            return body;
        }
        return {
            error: true,
            ...body
        }
    } catch(e) {}
}


export async function deleteUser() {
    try {
        const { refreshToken } = tokens.getTokenData();
        const response = await fetchWithAuth('/user', 'DELETE', { refreshToken });
        if (response.status === 204) {
            return { message: 'Account deleted'};
        }
        const body = await response.json();
        return {
            error: true,
            ...body
        }
    } catch(e) {
        console.log(e);
    }
}

export async function getUserLinks(page = 0, perPage = 10) {
    // try {
        const resp = await fetchWithAuth(`/user/link?page=${page}&per_page=${perPage}`);
        const body = await resp.json();
        if (resp.ok) {
            return Promise.resolve(body);
        }
        return Promise.reject(body.message);
    // } catch (e) {
        // console.log(e);
    // }
}
