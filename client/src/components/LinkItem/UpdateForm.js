import React, { useState, useContext } from 'react';
import SmallTextField from '../SmallTextField';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LinksContext from '../../context/links.context';
import linkValidation from '../../validation/link';

const UpdateForm = ({ origin, endpoint, description, uuid, onUpdate }) => {

    endpoint = endpoint.split('/').pop();
    const matches = useMediaQuery('(max-width: 810px)');

    const { updateLinkItem } = useContext(LinksContext);

    const [ originValue, setOrigin ] = useState(origin);
    const [ endpointValue, setEndpoint ] = useState(endpoint);
    const [ descriptionValue, setDescription ] = useState(description || '');
    const [ submitError, setSubmitError ] = useState(null);
    const [ errors, setErrors ] = useState({
        origin: '',
        endpoint: '',
        description: ''
    });

    const changeHandler = (handler) => (e) => handler(e.target.value);

    const submitHandler = async (e) => {
        e.preventDefault();
        // values have changed
        if (originValue && originValue == originValue &&
            endpointValue && endpoint == endpointValue &&
            !description && !description == !descriptionValue) {
                return;
        }
        try {
            const updateSet = {
                origin: originValue,
                endpoint: endpointValue,
                description: descriptionValue
            };

            await linkValidation.validate(updateSet);
            setErrors({});

            updateLinkItem(uuid, updateSet)
                .then(() => onUpdate(uuid))
                .catch((message) => setSubmitError(message));    

        } catch(e) {
            if (e.name === 'ValidationError') {
                setErrors((errors) => ({
                    ...errors,
                    [e.path]: e.message
                }));
            }
        }
    };

    return (
        <form className="link__edit-form" onSubmit={submitHandler}>
            <Grid container spacing={4}>
                <Grid item xs={12} style={{paddingTop: 0, color: 'red'}}>
                    <Typography variant="body2" align="center">{ submitError }</Typography>
                </Grid>
                <SmallTextField xs={6}
                    fieldName="Origin"
                    className="link__edit-text"
                    value={originValue}
                    onChangeHandler={changeHandler(setOrigin)}
                    error={errors.origin}
                />
                <SmallTextField xs={6}
                    fieldName="Endpoint"
                    className="link__edit-text"   
                    value={endpointValue}
                    onChangeHandler={changeHandler(setEndpoint)}          
                    error={errors.endpoint}                   
                />
                <SmallTextField xs={matches ? 7 : 8}
                    fieldName="Description"
                    className="link__edit-text"
                    value={descriptionValue}
                    onChangeHandler={changeHandler(setDescription)}
                    error={errors.description}
                />
                <Grid item xs={1}>
                    <Button type="submit"
                        color="secondary" 
                        variant="contained" 
                        className="link__update-btn">
                        Update
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default UpdateForm;
