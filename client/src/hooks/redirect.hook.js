import { getLink } from '../service/link.service';

const useRedirect = (endpoint) => {

    const requestProtectedEndpoint = async (password) => {
        try { 
            const origin = await getLink(endpoint, password);
            document.location.replace(origin);
        } catch(e) {
            return Promise.reject(e);
        }

    };

    return {
        requestProtectedEndpoint
    }
};

export default useRedirect;
