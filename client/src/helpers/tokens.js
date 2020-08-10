import { func } from "prop-types";

const TOKEN_KEY = 'sen-token';


export function saveToken(tokenData) {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(tokenData));
}

export function deleteToken() {
    localStorage.removeItem(TOKEN_KEY);
}

export function hasToken() {
    return localStorage.getItem(TOKEN_KEY) != null;
}