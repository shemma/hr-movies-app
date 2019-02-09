import { FETCH_MOVIES, UPDATE_MOVIE, DELETE_MOVIE, ADD_MOVIE } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
	switch (action.type) {
		case FETCH_MOVIES:
			return { ...state, ...action.payload };
		case ADD_MOVIE:
			state.Search.push(action.payload);
			return { ...state};
		case UPDATE_MOVIE:
			const updatedMoviesArray = state.Search.map(movie => {
				if (movie.imdbID === action.payload.id) {
					movie = {...movie, ...action.payload};
				}

				return movie;
			});
			return { ...state, Search: updatedMoviesArray };
		case DELETE_MOVIE:
			const newMoviesArray = state.Search.filter(movie => movie.imdbID !== action.payload.imdbID);
			return { ...state, Search: newMoviesArray };
		default:
			return state;
	}
}
