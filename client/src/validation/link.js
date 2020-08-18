import * as yup from 'yup';

const link = yup.object().shape({
    origin: yup.string().url().required(),
    endpoint: yup.string().min(2).notRequired(),
    description: yup.string().notRequired(),
    password: yup.string().min(4).matches(/.*[0-9].*/).notRequired()
});

export default link;