import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import messages from '../i18n/App.i18n.es';

const MovieDeleteModalView = ({movie, onHide, show, deleteMovie, T}) => {
	function onDeleteMovie() {
		deleteMovie(movie);
		onHide();
	};

	return (
		<Modal
			show={show}
			onHide={onHide}
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					{movie.Title}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>You are about to <strong>Delete</strong> this movie.</p>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={onHide}>{T(messages.deleteModalCancel)}</Button>
				<Button variant="primary" onClick={onDeleteMovie}>{T(messages.deleteModalAccept)}</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default MovieDeleteModalView;
