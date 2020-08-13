import * as yup from 'yup';

export const email = yup
                        .string()
                        .email('Provide a valid email!')
                        .required();

export default yup.object().shape({ email });