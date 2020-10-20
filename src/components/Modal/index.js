import React from 'react';

import { MdClose } from 'react-icons/md';

import { ModalContent, Container, Content } from './styles';

function Modal({ children, id = "modal", onClose = () => {} }) {
  function handleOutsideClickToClose(event) {
    if(event.target.id) onClose();
  }

  return (
    <ModalContent id={id} onClick={handleOutsideClickToClose}>
      <Container>
        <button tyle="button" onClick={onClose}>
          <MdClose />
        </button>
        <Content>{children}</Content>
      </Container>
    </ModalContent>
  );
}

export default Modal;