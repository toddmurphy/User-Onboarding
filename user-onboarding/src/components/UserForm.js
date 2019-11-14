import React from 'react';
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
    mapPropsToValues({ }) {
        return {
            //add properties or key values here -> name, email, password, terms of service(checkbox)
        };
    }
})(UserForm)

export default FormikUserSignUpForm;