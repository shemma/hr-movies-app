import { FETCH_MOVIES, UPDATE_MOVIE, DELETE_MOVIE, ADD_MOVIE, CLEAR_MOVIES } from '../actions/types';

const initialState = {
	searchTerm: 'Rings',
	Search: []
};

export default function(state = initialState, action) {
	switch (action.type) {
		case FETCH_MOVIES:
			const Search = action.payload.Search ? state.Search.concat(action.payload.Search) : state.Search;
			const hasMore = action.payload.Search && action.payload.Search.length > 0 ? true : false;
			return {...action.payload, Search, hasMore };
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
		case CLEAR_MOVIES:
			return { Search: [] };
		default:
			return state;
	}
}
