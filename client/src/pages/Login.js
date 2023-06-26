import React from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useContext, useEffect } from 'react';
import { FormGroup, Label, Col, Row } from 'reactstrap';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext'

function Login() {
    let navigate = useNavigate();
    const { setAuthState } = useContext(AuthContext);

    const initialValues = {
        username: '',
        password: ''
    };

    useEffect(()=>{
        document.title = "Logowanie"
      })

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .min(3, "Pole 'Login' musi mieć co najmniej 3 znaki!")
            .max(20, "Pole 'Login' może mieć co najwyżej 20 znaków!")
            .required("Pole 'Login' jest wymagane!"),
        password: Yup.string()
            .min(4, "Pole 'Hasło' muszą mieć co najmniej 4 znaki!")
            .max(26, "Pole 'Hasło' muszą mieć co najwyżej 26 znaków!")
            .required("Pole 'Hasło' jest wymagane!")
    })

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth/login", data).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            }
            else {
                localStorage.setItem("accessToken", response.data.token)
                setAuthState({
                    username: response.data.username,
                    id: response.data.id,
                    status: true
                });
                navigate(`/`)
            }
        }).catch(error => console.error(error))
    }

    return (
        <div className='RegistrationPage'>
            <Row>
                <Col><h1>Logowanie</h1></Col>
            </Row>

            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className='auth-form-container'>
                    <FormGroup row className='auth-form-row'>
                        <Label sm={3} className="auth-form-field-label">Login: </Label>
                        <Col sm={12}>
                            <Field className="auth-form-input" name="username" placeholder="np. user1" />
                        </Col>
                        <ErrorMessage name='username' render={msg => <Col className='form-error-col'>{msg}</Col>}></ErrorMessage>
                    </FormGroup>
                    <FormGroup row className='auth-form-row'>
                        <Label sm={3} className="auth-form-field-label">Hasło: </Label>
                        <Col sm={12}>
                            <Field className="auth-form-input" type="password" name="password" placeholder="np. B53bd!2sa-D" />
                        </Col>
                        <ErrorMessage name='password' render={msg => <Col className='form-error-col'>{msg}</Col>}></ErrorMessage>
                    </FormGroup>
                    <button type='submit' className='auth-button'>Zaloguj się</button>
                </Form>
            </Formik>

        </div>
    )
}

export default Login