import React, { useReducer, useEffect, useCallback, useState } from 'react';
import normalizeLink from '../helpers/normalizeLink';
import { getUserLinks } from '../service/account.service';
import { deleteLink, updateLink } from '../service/link.service';

const SET_FETCHED = 'set_fetched';
const SET_LINKS = 'set_links'
const SET_ERRORS = 'set_errors';
const SET_LOADING = 'set_loading';
const ADD_LINK = 'add_link';
const DELETE_LINK = 'delete_link';
const UPDATE_LINK = 'update_link';

const reducer = (state, action) => {
    switch(action.type) {
        case SET_FETCHED:
            return {
                ...state,
                isLoading: false,
                fetchedlinks: action.payload,
                links: action.payload
            };
        case SET_LINKS: 
            return {
                ...state,
                links: [...action.payload]
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
            };
        }
        case ADD_LINK: {
            return {
                ...state,
                links: [action.payload, ...state.links]
            };
        }
        case DELETE_LINK: {
            return {
                ...state,
                links: [...(state.links.filter(({ uuid }) => uuid != action.payload))]
            };
        }
        case UPDATE_LINK: {
            const index = state.links.findIndex(({ uuid}) => uuid === action.payload.uuid);
            const newObj = {
                ...state.links[index],
                ...action.payload.updateSet
            };
            const length = state.links.length;
            return {
                ...state,
                links: [...state.links.slice(0, index), 
                            newObj, ...state.links.slice(index + 1, length)]
            }
        }
        default: 
            return state;
    }
};

const useLink = () => {
    const initialState = {
        fetchedlinks: [], 
        links: [],
        error: false,
        isLoading: false
    };
    const [ rowsPerPage, setRowsPerPage ] = useState(5);
    const [ page, setPage ] = useState(0);
    const [ amount, setAmount ] = useState(0);
    const [ searchQuery, setSearchQuery ] = useState('');

    const [ state, dispatch ] = useReducer(reducer, initialState);

    const setFetched = ({ links, amount }) => {
        setAmount(amount);
        dispatch({ type: SET_FETCHED, payload: links})
    };
    const setLinks = (links) => dispatch({ type: SET_LINKS, payload: links });
    const setErrors = (error) => dispatch({ type: SET_ERRORS, payload: error });
    const setLoading = () => dispatch({ type: SET_LOADING });

    const addLink = (newLink) => dispatch({ type: ADD_LINK, payload: newLink });
    const deleteLinkItem = (linkUuid) => {
        deleteLink(linkUuid)
            .then(() => dispatch({ type: DELETE_LINK, payload: linkUuid }));
    };
    
    const updateLinkItem = async (uuid, updateSet) => {
        const normalized = normalizeLink(updateSet);
        try {
            const result = await updateLink(uuid, normalized);
            if (updateSet.endpoint) {
                updateSet.endpoint = `${window.location.href}/t/${updateSet.endpoint}`;
            }
            dispatch({
                type: UPDATE_LINK,
                payload: {
                    uuid,
                    updateSet
                }
            });
            return Promise.resolve();
        } catch (e) {
            return Promise.reject(e.message);
        }
    };

    const fetchLinks = useCallback(async () => {
        setLoading();
        getUserLinks()
            .then(setFetched)
            .catch(setErrors);
    }, [ ]);

    const searchInLinks = useCallback(() => {
        if(searchQuery) {
            const result = state.fetchedlinks.filter(({ origin }) => {
                return origin.includes(searchQuery);
            });
            setLinks(result);
        } else {
            setLinks(state.fetchedlinks);
        }
    }, [ searchQuery ]);

    useEffect(() => { fetchLinks() }, [ fetchLinks ]);
    useEffect(() => searchInLinks(), [ searchInLinks ]);

    return {
        links: state.links,
        isLoading: state.isLoading,
        rowsPerPage: [ rowsPerPage, setRowsPerPage ],
        page: [ page, setPage ],
        amount,
        searchQuery: [searchQuery, setSearchQuery],
        addLink,
        deleteLinkItem,
        updateLinkItem
    };

};

export default useLink;
