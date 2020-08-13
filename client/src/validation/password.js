import * as yup from 'yup';

export const password = yup
                        .string().min(7)
                        .matches(/.*[0-9].*/, 'Password must contain at least one digit')
                        .required();

export default yup.object().shape({ password });
