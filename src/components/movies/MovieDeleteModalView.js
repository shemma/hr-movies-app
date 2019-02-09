import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const MovieDeleteModalView = ({movie, onHide, show, deleteMovie}) => {
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
				<Button variant="secondary" onClick={onHide}>Cancel</Button>
				<Button variant="primary" onClick={onDeleteMovie}>Accept</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default MovieDeleteModalView;
