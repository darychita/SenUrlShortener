import React, { useState} from 'react';
import * as authService from '../service/auth.service';
import { hasToken } from '../helpers/tokens';

const useAuth = () => {
    const hasTokenInStorage = hasToken();
    const [ isAuthenticated, setAuthenticated ] = useState(hasTokenInStorage); 

    const login = async ({ email, password }) => {
        const resp = await authService.login(email, password);
        if(resp.error) {
            setAuthenticated(false);
            throw new Error(resp.message);
        }    
        setAuthenticated(true);
    };

    const logout = async () => {
        await authService.logout();
        setAuthenticated(false);
    };

    return { isAuthenticated, login, logout };
};

export default useAuth;
