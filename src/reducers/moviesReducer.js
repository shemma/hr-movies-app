import { FETCH_MOVIES, UPDATE_MOVIE, DELETE_MOVIE } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
	let newState = { ...state };
	switch (action.type) {
		case FETCH_MOVIES:
			return { ...newState, ...action.payload };
		case UPDATE_MOVIE:
			const updatedMoviesArray = newState.Search.map(movie => {
				if (movie.imdbID === action.payload.id) {
					movie.Director = action.payload.director;
					movie.Genre = action.payload.genre;
					movie.Runtime = action.payload.runTime;
					movie.Title = action.payload.title;
					movie.Year = action.payload.year;
				}

				return movie;
			});
			return { ...newState, Search: updatedMoviesArray };
		case DELETE_MOVIE:
			const newMoviesArray = newState.Search.filter(movie => movie.imdbID !== action.payload.imdbID);
			return { ...newState, Search: newMoviesArray };
		default:
			return newState;
	}
}
