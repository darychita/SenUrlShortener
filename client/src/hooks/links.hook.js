import React, { useReducer, useEffect, useCallback, useState } from 'react';
import { getUserLinks } from '../service/account.service';

const SET_LINKS = 'set_links';
const SET_ERRORS = 'set_errors';
const SET_LOADING = 'set_loading';


const reducer = (state, action) => {
    switch(action.type) {
        case SET_LINKS:
            return {
                ...state,
                isLoading: false,
                links: action.payload
            };
        case SET_ERRORS: 
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        case SET_LOADING: {
            return {
                ...state,
                isLoading: !state.isLoading
            }
        }
        default: 
            return state;
    }
};

const useLink = () => {
    const initialState = {
        links: [], 
        error: false,
        isLoading: false
    };
    const [ rowsPerPage, setRowsPerPage ] = useState(10);
    const [ page, setPage ] = useState(0);
    const [ amount, setAmount ] = useState(0);

    const [ state, dispatch ] = useReducer(reducer, initialState);
    const setLinks = ({ links, amount, perPage, page }) => {
        console.log('h2');
        setPage(page);
        setRowsPerPage(perPage);
        setAmount(amount);
        dispatch({ type: SET_LINKS, payload: links})
    };
    const setErrors = (error) => dispatch({ type: SET_ERRORS, payload: error });
    const setLoading = () => { dispatch({ type: SET_LOADING });}

    const fetchLinks = useCallback(async () => {
        console.log('hey');
        setLoading();
        getUserLinks(page, rowsPerPage)
            .then(setLinks)
            .catch(setErrors);
    }, [ page, rowsPerPage ]);

    useEffect(() => { fetchLinks() }, [ fetchLinks ]);
    
    return {
        ...state, 
        rowsPerPage: [ rowsPerPage, setRowsPerPage ],
        page: [ page, setPage ],
        amount
    };

};

export default useLink;
