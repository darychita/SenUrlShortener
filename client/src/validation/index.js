import * as yup from 'yup';
import emailSchema, { email } from './email';
import passwordSchema, { password } from './password';
import usernameSchema, { username } from './username';

const loginSchema = yup
                    .object()
                    .shape({ email, password });

const registrationSchema = yup
                            .object()
                            .shape({ email, password, username });

export { 
    emailSchema,
    passwordSchema,
    usernameSchema,
    registrationSchema,
    loginSchema
};
