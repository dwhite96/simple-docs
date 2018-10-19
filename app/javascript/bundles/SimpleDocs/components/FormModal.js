import React from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react';

import FileUploadForm from './FileUploadForm';
import '../stylesheets/simple_docs.scss';

const FormModal = () => (
  <Modal trigger={<Button>Upload file</Button>} style={{height: 300}}>
    <Modal.Header>Add file</Modal.Header>
    <Modal.Content>
      <FileUploadForm />
    </Modal.Content>
  </Modal>
);

export default FormModal;
