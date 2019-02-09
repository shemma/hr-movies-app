import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroller';
import MovieItemView from './MovieItemView';
import MovieAddEditModalView from './MovieAddEditModalView';
import messages from '../i18n/App.i18n.es';
import { deleteMovie, fetchMoviesList } from '../../actions';

import noResults from '../../css/image/noResults.png';
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
        this.loadMovies = this.loadMovies.bind(this);
    }

    renderMovieItems(moviesList) {
        const {T} = this.props;

        const moviesCardList = moviesList.map((movieItem) => {
            if (movieItem === null) return null;
            
            return (
                <MovieItemView 
                    key={movieItem.imdbID} 
                    movie={movieItem} 
                    deleteMovie={this.props.deleteMovie}
                    T={T}
                />
            );
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

    loadMovies(page) {
        const {movies: {searchTerm}} = this.props;
        this.props.fetchMoviesList(searchTerm , page);
    }

    render() {
        const {addMovieModal} = this.state;
        const {movies, T} = this.props;
        const moviesList = movies && movies.Search && movies.Search.length > 0 ? movies.Search : [];

        return (
            <div id='movies'>
                <Row className='add-movie'>
                    <Col>
                        <Button variant="info" className="float-right" onClick={this.handleShowAddModal}>
                            <i className="fas fa-plus-circle" /><span>{T(messages.addMovieBtn)}</span>
                        </Button>
                    </Col>
                </Row>
                <Row>
                    {moviesList.length > 0 && 
                        <InfiniteScroll
                            pageStart={1}
                            loadMore={this.loadMovies}
                            hasMore={movies.hasMore}
                            useWindow={true}
                            loader={<div className="loader" key={0}>Loading ...</div>}
                        >
                            {this.renderMovieItems(moviesList)}
                        </InfiniteScroll>
                    }
                    { movies.Response === 'False' && moviesList.length === 0 && 
                        <img style={{width: '100%', height: '100%'}} alt='' src={noResults} className="d-inline-block align-top" />
                    }
                </Row>
                {addMovieModal && this.renderAddMovieForm()}
            </div>
        );
    }
}

function mapStateToProps({ movies }) {
    return { movies };
}

export default connect(mapStateToProps, { deleteMovie, fetchMoviesList })(MoviesMainView);
