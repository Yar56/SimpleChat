import React, { useEffect, useRef } from 'react';
import {
  Modal, FormGroup, FormControl, Button, Form,
} from 'react-bootstrap';
// import _ from 'lodash';
import { useFormik } from 'formik';

// const generateOnSubmit = ({ setItems, onHide }) => (values) => {
//   const item = { id: _.uniqueId(), body: values.body };
//   setItems((items) => {
//     items.push(item);
//   });
//   onHide();
// };

// TODO: Последовательность шагов в сторе при отправке нового канала
// 1 - установить текущий канал 2 - закрыть модал 3 - добавить канал

const Add = (props) => {
  const inputRef = useRef();

  const {
    isOpened, onHide, allChannels, validateChannelName,
  } = props;
  const validate = validateChannelName(allChannels);

  const f = useFormik({
    initialValues: { body: '' },
    validationSchema: validate,
    onSubmit: ({ body }) => {
      console.log(body);
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal dialogAs={Modal.Dialog} show={isOpened} centered onHide={onHide}>
      <Modal.Header>
        <Modal.Title>Add</Modal.Title>
        <button onClick={onHide} aria-label="Close" data-bs-dismiss="modal" type="button" className="btn btn-close" />
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={f.handleSubmit}>
          <FormGroup>
            <FormControl
              required
              ref={inputRef}
              onChange={f.handleChange}
              value={f.values.body}
              data-testid="input-body"
              name="body"
              className="mb-2"
              isInvalid={!!f.errors.body}
            />
            <Form.Control.Feedback type="invalid">{f.errors.body}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button onClick={onHide} type="button" variant="secondary" className="me-2">Отменить</Button>
              <Button type="submit" variant="primary">Отправить</Button>
            </div>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
