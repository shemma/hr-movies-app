import React from 'react';
import { Modal } from 'react-bootstrap';
import MovieAddEditFormView from './MovieAddEditFormView';

const MovieAddEditModalView = ({movie, scope, onHide, show}) => {
    const title = movie ? movie.Title : 'Add New Movie';

    return (
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MovieAddEditFormView onHide={onHide} selectedMovie={movie} scope={scope} />
        </Modal.Body>
      </Modal>
    );
}

export default MovieAddEditModalView;
