import { Formik, Form as FormikForm} from 'formik';
import React from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useMutation } from 'react-fetching-library';
import { loginAction } from '../api/actions/auth';

function Login(props) {
  const { callback } = props;
  const { mutate: login } = useMutation(loginAction);

  const initialValues = {
    username: '',
    password: ''
  };

  const validate = values => {
    const errors = {};

    if (!values.username) {
      errors.username = 'Required';
    }

    if (!values.password) {
      errors.password = 'Required';
    }

    return errors;
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    const { error, payload: auth } = await login(values.username, values.password);

    if (error) {
      return;
    }

    callback(auth.token);
    setSubmitting(false);
  }

  return (
    <React.Fragment>
      <Row className="justify-content-md-center pt-5">
        <Col md="3">
        <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
          { (
              {
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                isSubmitting 
              }
            ) => (
            <FormikForm>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="username" placeholder="Username" onChange={handleChange} onBlur={handleBlur} value={values.username} />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} onBlur={handleBlur} value={values.password} />
              </Form.Group>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </FormikForm>
            )
          }
        </Formik>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Login;