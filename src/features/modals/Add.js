import React, { useEffect, useRef } from 'react';
import {
  Modal, FormGroup, FormControl, Button, Form,
} from 'react-bootstrap';
// import _ from 'lodash';
import * as yup from 'yup';
import { useFormik } from 'formik';
// import * as Yup from 'yup';
// const generateOnSubmit = ({ setItems, onHide }) => (values) => {
//   const item = { id: _.uniqueId(), body: values.body };
//   setItems((items) => {
//     items.push(item);
//   });
//   onHide();
// };

// TODO: Последовательность шагов в сторе при отправке нового канала
// 1 - установить текущий канал 2 - закрыть модал 3 - добавить канал
const validation = yup.object().shape({
  body: yup.string().min(3, 'От 3 до 20 символов').max(20, 'От 3 до 20 символов'),
});

const Add = (props) => {
  const { isOpened, onHide } = props;
  // const [currentBody, setCurrentBody] = useState('');
  // const schema = validate(allChannels);
  // console.log(schema.validate);
  // const validateC = yup.object().shape({
  //   body: yup.string().min(3, 'коротко'),
  // });

  const f = useFormik({
    initialValues: { body: '' },
    // validationSchema: yup.object().shape({
    //   body: schema.validate(currentBody),
    // }),
    validationSchema: validation,
    onSubmit: ({ body }) => {
      // setCurrentBody(body);
      console.log(body);
    },
    // isValidating: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

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
