import React, { useState } from 'react';
import { useFormik } from 'formik';
import {
  Button, Form, InputGroup, FormControl,
} from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';

const AddMessageForm = () => {
  const [message, setMessage] = useState();
  console.log(message, setMessage);
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form noValidate className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
        <InputGroup className="input-group has-validation">
          <FormControl
            onChange={formik.onChange}
            className="border-0 p-0 ps-2 form-control"
            placeholder="Введите сообщение..."
          />
          <Button type="submit" variant="btn btn-group-vertical" disabled>
            <ArrowRightSquare size={20} fill="currentColor" />
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};
export default AddMessageForm;
