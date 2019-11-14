import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


const UserForm = ({ values, touched, errors, status }) => {
    // Add slice of state for 'user'
    const [users, setUsers] = useState([]);


    return (
        <div>
            <h3>Onboarding - new user sign up </h3>
            {/* Formik 'Field' inputs to add --> name, email, password, terms of service(checkbox) */}
            <Form>
                <Field
                    type='text'
                    name='name'
                    placeholder='name'
                // {touched.name && errors.name && <p>{errors.name}</p>}
                />
                <Field
                    type='text'
                    name='email'
                    placeholder='email'
                // {touched.email && errors.email && <p>{errors.email}</p>}
                />
                <Field
                    type='text'
                    name='password'
                    placeholder='password'
                // {touched.password && errors.password && <p>{errors.password}</p>}
                />
                <Field
                    type='checkbox'
                    name='terms'
                    checked={values.terms}
                />
                <button>Submit</button>
            </Form>
            {/* map over users --> output values: name, email, password */}
            {users.map(user => (
                <ul>
                    <li>{user.name}</li>
                    <li>{user.email}</li>
                    <li>{user.password}</li>
                </ul>
            ))}
        </div>
    );
}

const FormikUserSignUpForm = withFormik({
    mapPropsToValues({ name, email, password, terms }) {
        return {
            //add properties or key values here -> name, email, password, terms of service(checkbox) --> LINKS(maps) to 'name' property in 'Field' inputs
            //Set each property to empty string '' for those that text inputs
            //Set property true/false for checkbox
            name: name || '',
            email: email || '',
            password: password || '',
            terms: terms || false
        };
    },
    validationSchema: Yup.object().shape({
        // Add validation for each Field input
        name: Yup.string().required('Please type in your name'),
        email: Yup.string().required('Please type in your email'),
        password: Yup.string().required('Please type in a strong password')
    })
})(UserForm)

export default FormikUserSignUpForm;