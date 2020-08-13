import postFetch from '../helpers/postFetch';


export async function register(username, email, password) {
    try {
        const body = { username, email, password };
        const resp = await postFetch('/register', body);
        if (resp.status == 201) {
            return 'Activation email sent to your email. Please, check input';
        }
        const respBody = await resp.json();
        return {
            error: true,
            ...respBody
        }
    } catch(e) {
        console.log(e);
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
        const response = await postFetch('/reset', { email });
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

export async function resetPasswordConfirm(token, password) {
    try {
        const response = await postFetch(`/reset/${token}`, { password });
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