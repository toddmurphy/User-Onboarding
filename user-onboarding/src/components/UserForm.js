import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


const UserForm = ({ values }) => {
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
                <Field
                    type='text'
                    name='email'
                    placeholder='email'
                />
                <Field
                    type='text'
                    name='password'
                    placeholder='password'
                />
                <Field
                    type='checkbox'
                    name='terms'
                    checked={values.terms}
                />
                <button>Submit</button>
            </Form>
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
    }
})(UserForm)

export default FormikUserSignUpForm;