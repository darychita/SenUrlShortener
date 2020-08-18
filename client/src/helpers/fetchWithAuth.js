import { updateToken } from '../service/auth.service';
import { getTokenData } from './tokens';


async function fetchWithAuth(url, method = 'GET', body) {
    const loginUrl = '/login';
    let tokenData = getTokenData();
    if (!tokenData){
        return window.location.replace(loginUrl);
    }
    let options = {
        method,
        body: JSON.stringify(body),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };    
    

    if (Date.now() > tokenData.expiresIn) {
        try {
            tokenData = await updateToken();
        } catch(e) {
            return window.location.replace(loginUrl);
        }

    }
    
    options.headers.Authorization = `Bearer ${tokenData.accessToken}`;

    return fetch(url, options);
}

export default fetchWithAuth;
