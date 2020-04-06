const yup =require('yup');



export const MainFormSchema = yup.object().shape({
    firstname: yup.string().min(1).required(),
    lastname: yup.string().min(1).required(),
    email: yup.string().email().required(),
    number: yup.string().max(10).min(10).required(),
    npi: yup.string().max(6).min(6).required(),
    state: yup.string().min(2).max(2).required(),
    zip: yup.string().max(5).min(5).required(),
    city: yup.string().min(1).required(),
    address: yup.string().min(1).required()
});