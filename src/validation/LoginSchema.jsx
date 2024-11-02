import * as yup from "yup";
export const LoginSchema = () => {
    return yup.object().shape({
        username: yup.string().required("Username is required"),
        useremail: yup.string().email('Invalid email').required('Email is required'),
        userpassword: yup.string().min(4, "Min length is 4 symbol").max(8, "Max length is 8 symbol").required('Password is required')
    })
} 