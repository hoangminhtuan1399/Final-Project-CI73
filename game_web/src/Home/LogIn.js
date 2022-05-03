import './style.css';
import { useContext, useState } from 'react';
import UserContext from '../Context/UserContext';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import * as yup from 'yup';

const LogIn = () => {
    const userContext = useContext(UserContext);

    const [errorMessage, setErrorMessage] = useState('');
    const [hasError, setHasError] = useState(false);

    const [successMessage, setSuccessMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const validationSchema = yup.object().shape({
        username: yup
            .string()
            .min(5, "5 characters or more!")
            .max(12, "12 characters or less!")
            .required("Please enter your username!"),
        password: yup
            .string()
            .min(6, "6 characters or more!")
            .max(15, "15 characters or less!")
            .required("Please enter your secret code!"),
    });

    const userFormik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: () => { },
        validationSchema: validationSchema,
    });

    const handleFormLogIn = (e) => {
        e.preventDefault();

        userFormik.handleSubmit();

        setIsSuccess(false);

        if (userFormik.values.username === '' || userFormik.values.password === '') return;

        const result = {
            username: userFormik.values.username,
            password: userFormik.values.password,
        };

        const checkUser = userContext.userlist.filter((item) => item.username === result.username);

        if (checkUser.length === 0) {
            setErrorMessage('No username found!');
            setHasError(true);
            return;
        };

        if (checkUser[0].password !== result.password) {
            setErrorMessage('Wrong password!');
            setHasError(true);
            return;
        }

        userContext.setCurrentUser({
            ...checkUser[0],
            isLogIn: true,
        });
        
        const userIndex = userContext.userlist.indexOf(checkUser[0]);
        userContext.userlist[userIndex].isLogIn = true;
        userContext.updateLocal(userContext.userlist);
    }

    const handleFormSignUp = (e) => {
        e.preventDefault();

        userFormik.handleSubmit();

        setIsSuccess(false);

        if (userFormik.values.username === '' || userFormik.values.password === '') return;


        const result = {
            username: userFormik.values.username,
            password: userFormik.values.password,
        };

        const checkUser = userContext.userlist.filter((item) => item.username === result.username);

        if (checkUser.length !== 0) {
            setErrorMessage('Your username is already taken!');
            setHasError(true);
            return;
        };

        userContext.setUserlist(
            [
                ...userContext.userlist,
                {
                    ...userContext.initialUser,
                    username: result.username,
                    password: result.password,
                }
            ]
        );

        userContext.updateLocal(
            [
                ...userContext.userlist,
                {
                    ...userContext.initialUser,
                    username: result.username,
                    password: result.password,                    
                }
            ]
        );

        setHasError(false);
        setSuccessMessage('Sign Up Successfully! Let\'s go!');
        setIsSuccess(true);
    }
    return (
        <Form>
            <h6>Hello Mystery Guess</h6>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Who you are"
                    name="username"
                    value={userFormik.values.username}
                    onChange={(e) => { setHasError(false); userFormik.setTouched(false); userFormik.handleChange(e) }} />
            </Form.Group>

            {userFormik.touched.username && userFormik.errors.username && <div className='form__error'>{userFormik.errors.username}</div>}

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Your secret code"
                    name="password" value={userFormik.values.password}
                    onChange={(e) => { setHasError(false); userFormik.setTouched(false); userFormik.handleChange(e) }} />
            </Form.Group>

            {userFormik.touched.password && userFormik.errors.password && <div className='form__error'>{userFormik.errors.password}</div>}

            {hasError && <div className='form__error'>{errorMessage}</div>}
            {isSuccess && <div className='form__success'>{successMessage}</div>}

            <Form.Group className="mb-3 button__wrapper">
                <Button variant="primary" type="submit" onClick={handleFormLogIn}>
                    Log In
                </Button>
                <Button variant="primary" onClick={handleFormSignUp}>
                    Sign Up
                </Button>
            </Form.Group>
        </Form>
    )
}

export default LogIn;