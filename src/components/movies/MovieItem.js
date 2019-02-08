import React, {Component} from 'react';
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import MovieEditModalView from './MovieEditModalView';
import MovieDeleteModalView from './MovieDeleteModalView';
import noImage from '../../css/image/noImage.jpg';

class MovieItem extends Component {
    constructor(props) {
        super(props);

        this.handleShowEditModal = this.handleShowEditModal.bind(this);
        this.handleCloseEditModal = this.handleCloseEditModal.bind(this);
        this.handleShowDeleteModal = this.handleShowDeleteModal.bind(this);
        this.handleCloseDeleteModal = this.handleCloseDeleteModal.bind(this);
    
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

    render() {
        const {movie, deleteMovie} = this.props;

        return (
            <Card>
                <Card.Img variant="top" src={movie.Poster !== 'N/A' ? movie.Poster : noImage} alt='' style={{height: '18rem', width: '100%'}}/>
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>
                        <p>Year: {movie.Year}</p>
                        <p>Runtime: {movie.Runtime}</p>
                        <p>Genre: {movie.Genre}</p>
                        <p>Director: {movie.Director}</p>
                    </ListGroupItem>
                </ListGroup>
                <Card.Body>
                    <Button variant="outline-primary" onClick={this.handleShowEditModal}>Edit movie</Button>
                    <Button variant="outline-danger" className="float-right" onClick={this.handleShowDeleteModal}>Delete</Button>
                </Card.Body>
                <MovieEditModalView
                    show={this.state.editModalShow}
                    onHide={this.handleCloseEditModal}
                    movie={movie}
                />
                <MovieDeleteModalView
                    show={this.state.deleteModalShow}
                    onHide={this.handleCloseDeleteModal}
                    movie={movie}
                    deleteMovie={deleteMovie}
                />
            </Card>
        );
    }
}

export default MovieItem;