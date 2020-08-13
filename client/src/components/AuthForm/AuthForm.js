import React, { useState } from 'react';
import { 
    Typography, 
    Box,
    Avatar,
    Link,
    makeStyles
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import './AuthForm.scss';


const useStyles = (mainColor) => makeStyles((theme) => ({
    avatar: {
        backgroundColor: theme.palette[mainColor].main
    }
}));


// According to the fact, Login and Registration forms have pretty similar structure,
// I decided to create a component which will accept list of textinputs and render them into form
const AuthForm = ({ mainColor, // primary color for this form
                    title, 
                    children: textFields, // list of text inputs
                    submitButton,
                    links, // links in the bottom of form
                    validationSchema // instance of yup validation 
                }) => {

    const { avatar } = useStyles(mainColor)();

    // retrieve names of text inputs passed to the component and set the initial values to them. 
    // [ <textInputName>, <initialValue> ]
    // fields in validation schema are the same as in the text inputs
    const inputs = textFields.map((textField) => [ textField.props.name, '' ]);
    // collect object from prepared input names and values
    // we need object to validate in comfortable way with yup
    const inputValues = Object.fromEntries(inputs);
    // control values of text inputs by setting them to state
    const [ values, setValues ] = useState(inputValues);
    // errors will appear when validation fails
    const [ errors, setErrors ] = useState({});
    
    const [ responceError, setResponceError ] = useState(null);

    // update state when value of input changes
    const onChange = (e) => {
        const name = e.target.name;
        setValues({
            ...values,
            [name]: e.target.value
        });
    };

    // submit handler accepts the handler which was initially passed to the submit button 
    // first we validate data typed by user 
    // and if it's okay we call handler, if no
    // we set error state and show user error message
    const onSubmit = (handler) => {
        return async (e) => {
            e.preventDefault();
            let data;
            try {
                data = await validationSchema.validate(values);
                setErrors({});
            } catch(error) {
                const { path, message } = error;
                return setErrors({
                    ...errors, 
                    [path]: message
                });
            }

            try {
                await handler(data);    
            } catch(e) {
                setResponceError(e.message); 
            }
        };
    };

    return (
        <Box className="auth-form">
            <form>
                <Avatar className={avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h4" align="center" color="textPrimary">
                    {title}
                </Typography>
                <Typography component="p" variant="subtitle1" align="center">
                    {responceError}
                </Typography>
                <Box>
                    {
                        React.Children.map(textFields, (child) => {
                            const name = child.props.name; // name of text input serves as the key in 'values' and 'error' states 
                            return React.cloneElement(child, { 
                                fullWidth: true, 
                                margin: 'normal',
                                onChange,
                                value: values[name],
                                helperText: errors[name] ?? '',
                                error: !!errors[name]
                            })
                        })
                    }
                </Box>
                {
                    React.cloneElement(submitButton, { 
                        fullWidth: true,
                        className: `${submitButton.props.className} submit-button`,
                        onClick: onSubmit(submitButton.props.onClick) // override initially passed click handler
                    })
                }
            </form>

            { 
                links.map(({ text, href = '#'}, i) => (
                    <Typography align="center" key={`${href}${i}`}>
                        <Link component={RouterLink} variant="body2" to={href}>
                            {text}
                        </Link>
                    </Typography>    
                ))
            }
        </Box>
    );
};

export default AuthForm;
