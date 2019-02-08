import React from 'react';
import { Modal } from 'react-bootstrap';
import MovieEditFormView from './MovieEditFormView';

const MovieEditModalView = ({movie, onHide, show}) => {
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
            Edit: {movie.Title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MovieEditFormView onHide={onHide} selectedMovie={movie} />
        </Modal.Body>
      </Modal>
    );
}

export default MovieEditModalView;
