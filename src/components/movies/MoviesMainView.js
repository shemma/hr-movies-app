import React, {Component} from 'react';
import { connect } from 'react-redux';
import { CardColumns } from 'react-bootstrap';
import MovieItem from './MovieItem';
import { deleteMovie } from '../../actions';

class MoviesMainView extends Component {
    constructor(props) {
        super(props);

        this.renderMovieItems = this.renderMovieItems.bind(this);
    }

    renderMovieItems(moviesList) {
        const moviesCardList = moviesList.map((movieItem, index) => {
            if (movieItem === null) return null;
            
            return <MovieItem key={index} movie={movieItem} deleteMovie={this.props.deleteMovie} />
        });

        return(
            <CardColumns>
                {moviesCardList}
            </CardColumns>
        );
    }

    render() {
        const {movies} = this.props;
        const moviesList = movies && movies.Search && movies.Search.length > 0 ? movies.Search : [];

        return (
            <div>
                {moviesList.length > 0 ? (
                    <div>{this.renderMovieItems(moviesList)}</div>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        );
    }
}

function mapStateToProps({ movies }) {
    return { movies };
  }

export default connect(mapStateToProps, { deleteMovie })(MoviesMainView);
