import React, { useEffect, useRef } from 'react';
import {
  Modal, FormGroup, FormControl, Button,
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

const Add = (props) => {
  const { isOpened, onHide } = props;

  const f = useFormik({ onSubmit: () => {}, initialValues: { body: '' } });

  const inputRef = useRef();
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
        <form onSubmit={f.handleSubmit}>
          <FormGroup>
            <FormControl
              required
              ref={inputRef}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              value={f.values.body}
              data-testid="input-body"
              name="body"
              className="mb-2"
            />
          </FormGroup>
          <div className="invalid-feedback">{null}</div>
          <div className="d-flex justify-content-end">
            <Button onClick={onHide} type="button" variant="secondary" className="me-2">Отменить</Button>
            <Button type="submit" variant="primary">Отправить</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
