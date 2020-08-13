import * as yup from 'yup';

export const username = yup
                        .string()
                        .min(6)
                        .matches(/^[A-Za-z0-9]+$/, 'The username must contain only letters and digits.')
                        .required();

export default yup.object().shape({ username });