import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col } from 'react-bootstrap';
import MovieItemView from './MovieItemView';
import MovieAddEditModalView from './MovieAddEditModalView';
import { deleteMovie } from '../../actions';

import '../../css/movies.scss';

class MoviesMainView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addMovieModal: false
        };

        this.renderMovieItems = this.renderMovieItems.bind(this);
        this.renderAddMovieForm = this.renderAddMovieForm.bind(this);
        this.handleShowAddModal = this.handleShowAddModal.bind(this);
        this.handleCloseAddModal = this.handleCloseAddModal.bind(this);
    }

    renderMovieItems(moviesList) {
        const moviesCardList = moviesList.map((movieItem) => {
            if (movieItem === null) return null;
            
            return <MovieItemView key={movieItem.imdbID} movie={movieItem} deleteMovie={this.props.deleteMovie} />
        });

        return <div className='movie-card-container'>{moviesCardList}</div>;
    }

    handleShowAddModal() {
        this.setState({ addMovieModal: true });
    }

    handleCloseAddModal() {
        this.setState({ addMovieModal: false });
    }

    renderAddMovieForm() {
        return(
            <MovieAddEditModalView
                show={this.state.addMovieModal}
                onHide={this.handleCloseAddModal}
                scope={'Add'}
            />
        );
    }

    render() {
        const {addMovieModal} = this.state;
        const {movies} = this.props;
        const moviesList = movies && movies.Search && movies.Search.length > 0 ? movies.Search : [];

        return (
            <div>
                <Row style={{padding: '1rem'}}>
                    <Col>
                        <Button variant="info" className="float-right" onClick={this.handleShowAddModal}>
                            <i className="fas fa-plus-circle" style={{marginRight: '10px'}}/><span>Add Movie</span>
                        </Button>
                    </Col>
                </Row>
                <Row>
                    {moviesList.length > 0 && <div id='movies'>{this.renderMovieItems(moviesList)}</div>}
                </Row>
                { addMovieModal && this.renderAddMovieForm() }
            </div>
        );
    }
}

function mapStateToProps({ movies }) {
    return { movies };
  }

export default connect(mapStateToProps, { deleteMovie })(MoviesMainView);
