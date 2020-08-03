import React from 'react';
import { 
    Typography, 
    Box,
    Avatar,
    Link,
    makeStyles
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import './AuthForm.scss';


const useStyles = (mainColor) => makeStyles((theme) => ({
    avatar: {
        backgroundColor: theme.palette[mainColor].main
    }
}));

const AuthForm = ({ mainColor, 
                    title, 
                    children: textFields,
                    submitButton, 
                    links
                }) => {

    const { avatar } = useStyles(mainColor)();

    return (
        <Box className="auth-form">
            <form>
                <Avatar className={avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h4" align="center" color="textPrimary">
                    {title}
                </Typography>
                <Box>
                    {
                        React.Children.map(textFields, (child) => {
                            return React.cloneElement(child, { fullWidth: true, margin: "normal" })
                        })
                    }
                </Box>
                {
                    React.cloneElement(submitButton, { 
                        fullWidth: true,
                        className: `${submitButton.props.className} submit-button` 
                    })
                }
            </form>

            { 
                links.map(({ text, href = '#'}, i) => (
                    <Typography align="center" key={`${href}${i}`}>
                        <Link href={href} variant="body2" >
                            {text}
                        </Link>
                    </Typography>    
                ))
            }
        </Box>
    );
};

export default AuthForm;
