import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, Label, Col, Row } from 'reactstrap';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'

function Register() {
  let navigate = useNavigate();
  const [loginRegistered, setLoginRegistered] = useState("false")

  const initialValues = {
    username: '',
    password: ''
  };

  useEffect(()=>{
    document.title = "Rejestracja"
  })

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      // .min(3, "Login musi mieć co najmniej 3 znaki!")
      // .max(20, "Login może mieć co najwyżej 20 znaków!")
      .matches(/^(?![A-Za-z]\d?$)[a-zA-Z]+\d*$/,"Login może składać się z małych i wielkich liter oraz cyfr.")
      .required("Login jest wymagany!"),
    password: Yup.string()
      // .min(4, "Hasło musi mieć co najmniej 8 znaków!")
      // .max(26, "Hasło może mieć co najwyżej 26 znaków!")
      .matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,"Hasło musi składać się z co najmniej: 1 małej oraz dużej litery, 1 cyfry, 1 znaku specjalnego.")
      .required("Hasło jest wymagane!"),
      
  })

  const onSubmit = (data) => {
    axios.get(`http://localhost:3001/auth/username/${data.username}`).then((response) => {
      if(response.data !== null)
      {
        setLoginRegistered("true");
      }
      else {
        axios.post("http://localhost:3001/auth", data).then(() => {
          navigate(`/login`)
        })
      }
    });
  }

  return (
    <div className='RegistrationPage'>
      <Row>
          <Col><h1>Rejestracja</h1></Col>
      </Row>

      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className='auth-form-container'>
          <FormGroup row className='auth-form-row'>
            <Label sm={3} className="auth-form-field-label">Login: </Label>
            <Col sm={12}>
              <Field className="auth-form-input" name="username" placeholder="np. user1" />
            </Col>
            <ErrorMessage name='username' render={msg => <Col className='form-error-col'>{msg}</Col>}></ErrorMessage>
            <Col name='usernameExists'><Col className='form-error-col'>{loginRegistered==="true" ? "Login jest już zajęty!" : ""}</Col></Col>
          </FormGroup>
          <FormGroup row className='auth-form-row'>
            <Label sm={3} className="auth-form-field-label">Hasło: </Label>
            <Col sm={12}>
              <Field className="auth-form-input" type="password" name="password" placeholder="np. B53bd!2sa-D" />
            </Col>
            <ErrorMessage name='password' render={msg => <Col className='form-error-col'>{msg}</Col>}></ErrorMessage>
          </FormGroup>
          <button type='submit' className='auth-button'>Zarejestruj się</button>
        </Form>
      </Formik>

    </div>
  )
}

export default Register