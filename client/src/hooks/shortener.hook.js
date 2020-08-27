import { useReducer, useState, useContext } from 'react';
import linkValidation from '../validation/link';
import { createLink } from '../service/link.service';
import normalizeLink from '../helpers/normalizeLink';
import LinksContext from '../context/links.context';

const useShortener = (isAuthenticated) => {
    const { addLink } = useContext(LinksContext);

    const reducer = (state, action) => {
        switch(action.type) {
            case 'value': {
                const { prop, value} = action;
                return {
                    ...state, [prop]: { value, error: '' }
                };
            }
            case 'error': {
                const { prop, error } = action;
                const oldState = state[prop];
                return {
                    ...state, [prop]: { ...oldState, error }
                };
            }
            default:
                return state;
        }
    };


    const formValues = () => ({
        value: '',
        error: '',
    });

    const fullLinkConfig = {
        origin: formValues('origin'),
        password: formValues('password'),
        endpoint: formValues('endpoint'),
        description:  formValues('description'),
    };

    const shortConfig = {
        origin: formValues('origin') 
    };


    const initialState = isAuthenticated ? fullLinkConfig : shortConfig;
    const [ link, setLinkProp ] = useReducer(reducer, initialState);
    const [ isLoading, setLoading ] = useState(false);
    const [ finalEndpoint, setFinalEnpoint ] = useState(null);

    const setValue = (prop, value) => { 
        setLinkProp({ type: 'value', prop, value }) 
    };

    const setError = (prop, error) => {
        setLinkProp({ type: 'error', prop, error }) 
    };


    const create = async () => {
        setLoading(true);
        try {
            const normalized = normalizeLink(link);
            await linkValidation.validate(normalized, { abortEarly: false });

            const { endpoint, uuid } = await createLink(normalized, isAuthenticated);
            
            normalized.endpoint = endpoint;
            normalized.uuid = uuid;
            normalized.views = 0;

            setLoading(false);
            setFinalEnpoint(endpoint);
            
            addLink(normalized);
        }  catch(e) {
            setLoading(false);
            if (e.name === 'ValidationError') {
                const errors = e.inner.reduce((acc, { path, message }) => {
                    if (!acc[path]) {
                        acc[path] = message;
                    }
                    return acc;
                }, {});
                Object.entries(errors)
                    .forEach(([ prop, error ]) => setError(prop, error));
            }
            if (e.message) {
                setError('origin', e.message);
            }
        } 
    };  



    return {
        ...link,
        create,
        isLoading,
        setValue, 
        setError,
        finalEndpoint
    };
};

export default useShortener;
