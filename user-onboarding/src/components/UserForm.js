import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';



const ListStyle = styled.ul`
    text-decoration: none;
    padding: 1% 0;
`

const UserForm = ({ values, touched, errors, status }) => {
    // Add slice of state for 'user'
    const [users, setUsers] = useState([]);

    useEffect(() => {
        status && setUsers(users => [...users, status]);
    }, [status])

    return (
        <div>
            <h3>Onboarding - new user sign up </h3>
            {/* Formik 'Field' inputs to add --> name, email, password, terms of service(checkbox) */}
            <Form>
                <Field
                    type='text'
                    name='name'
                    placeholder='name'
                />
                {touched.name && errors.name && <p>{errors.name}</p>}
                <Field
                    type='text'
                    name='email'
                    placeholder='email'
                />
                {touched.email && errors.email && <p>{errors.email}</p>}
                <Field
                    type='text'
                    name='address'
                    placeholder='address'
                />
                {touched.address && errors.address && <p>{errors.address}</p>}
                <Field
                    type='text'
                    name='country'
                    placeholder='country'
                />
                {touched.country && errors.country && <p>{errors.country}</p>}
                <Field
                    type='text'
                    name='password'
                    placeholder='password'
                />
                {touched.password && errors.password && <p>{errors.password}</p>}
                <Field as='select' name='role'>
                    <option value='designer'>Designer</option>
                    <option value='frontend'>Front-End Developer</option>
                    <option value='backend'>Back-End Developer</option>
                    <option value='ios'>iOS Developer</option>
                </Field>
                <Field
                    type='checkbox'
                    name='terms'
                    checked={values.terms}
                />
                <Field
                    type='text'
                    name='cohort'
                    placeholder='Lambda cohort team'
                />
                <button type='submit'>Submit</button>
            </Form>
            {/* map over users --> output values: name, email, password */}
            {
                users.map(user => (
                    <ul key={user.id}>
                        <ListStyle>{user.name}</ListStyle>
                        <ListStyle>{user.email}</ListStyle>
                        <ListStyle>{user.address}</ListStyle>
                        <ListStyle>{user.country}</ListStyle>
                        <ListStyle>{user.password}</ListStyle>
                        <ListStyle>{user.role}</ListStyle>
                        <ListStyle>{user.cohort}</ListStyle>
                    </ul>
                ))
            }
        </div >
    );
}

const FormikUserSignUpForm = withFormik({
    mapPropsToValues({ name, email, address, country, password, role, cohort, terms }) {
        return {
            //add properties or key values here -> name, email, password, terms of service(checkbox) --> LINKS(maps) to 'name' property in 'Field' inputs
            //Set each property to empty string '' for those that text inputs
            //Set property true/false for checkbox
            name: name || '',
            email: email || '',
            address: address || '',
            country: country || '',
            password: password || '',
            role: role || '',
            cohort: cohort || '',
            terms: terms || false
        };
    },
    validationSchema: Yup.object().shape({
        // Add validation for each Field input
        name: Yup.string().required('Please type in your real name'),
        email: Yup.string().required('Please type in your email, no hotmail allowed'),
        address: Yup.string().required('Yo, what address you live at?'),
        country: Yup.string().required('Dude, what country you from?'),
        password: Yup.string().required('He,him,them,she,her,they - that password has to be there')
    }),
    handleSubmit(values, { setStatus }) {
        //values is our object with all our data on its
        axios
            .post('https://reqres.in/api/users', values)
            .then(response => {
                setStatus(response.data);
                console.log(response);
            })
            .catch(error => {
                console.log('The data did not return', error)
            })
    }
})(UserForm)

export default FormikUserSignUpForm;