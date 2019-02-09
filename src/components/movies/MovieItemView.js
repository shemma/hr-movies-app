import React, {Component} from 'react';
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import MovieAddEditModalView from './MovieAddEditModalView';
import MovieDeleteModalView from './MovieDeleteModalView';
import messages from '../i18n/App.i18n.es';

import noImage from '../../css/image/noImage.jpg';

class MovieItem extends Component {
    constructor(props) {
        super(props);

        this.handleShowEditModal = this.handleShowEditModal.bind(this);
        this.handleCloseEditModal = this.handleCloseEditModal.bind(this);
        this.handleShowDeleteModal = this.handleShowDeleteModal.bind(this);
        this.handleCloseDeleteModal = this.handleCloseDeleteModal.bind(this);
        this.transformTitleString = this.transformTitleString.bind(this);
    
        this.state = {
            editModalShow: false,
            deleteModalShow: false
        };
    }

    handleCloseEditModal() {
        this.setState({ editModalShow: false });
    }
    
    handleShowEditModal() {
        this.setState({ editModalShow: true });
    }

    handleCloseDeleteModal() {
        this.setState({ deleteModalShow: false });
    }
    
    handleShowDeleteModal() {
        this.setState({ deleteModalShow: true });
    }

    transformTitleString(title) {
        const cleanWords = title.replace(/[^a-zA-Z ]/g, '').split(' ').map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        });

        return cleanWords.join().replace(/[,]/g, ' ');
    }

    render() {
        const {movie, deleteMovie, T} = this.props;

        return (
            <div className='card-item'>
                <Card>
                    <Card.Img variant="top" src={movie.Poster !== 'N/A' ? movie.Poster : noImage} alt='' />
                    <Card.Body className='card-title'>
                        <Card.Title>{this.transformTitleString(movie.Title)}</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem className="card-group-item">
                            <p><strong>{T(messages.year)}</strong>: {movie.Year}</p>
                            <p><strong>{T(messages.runtime)}</strong>: {movie.Runtime}</p>
                            <p><strong>{T(messages.genre)}</strong>: {movie.Genre}</p>
                            <p><strong>{T(messages.director)}</strong>: {movie.Director}</p>
                        </ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        <Button variant="outline-primary" onClick={this.handleShowEditModal}>{T(messages.editMovieBtn)}</Button>
                        <Button variant="outline-danger" className="float-right" onClick={this.handleShowDeleteModal}>{T(messages.deleteMovieBtn)}</Button>
                    </Card.Body>
                    <MovieAddEditModalView
                        show={this.state.editModalShow}
                        onHide={this.handleCloseEditModal}
                        movie={movie}
                        scope={'Edit'}
                    />
                    <MovieDeleteModalView
                        show={this.state.deleteModalShow}
                        onHide={this.handleCloseDeleteModal}
                        movie={movie}
                        deleteMovie={deleteMovie}
                        T={T}
                    />
                </Card>
            </div>
        );
    }
}

export default MovieItem;