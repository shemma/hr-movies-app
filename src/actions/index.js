import axios from 'axios';

import { FETCH_MOVIES, UPDATE_MOVIE, DELETE_MOVIE, ADD_MOVIE, CLEAR_MOVIES } from './types';

const baseUrl = 'https://www.omdbapi.com/';
const apiKey = '&type=movie&apikey=a34526ae';

export const fetchMoviesList = (searchTerm, page) => async dispatch => {
	const searchUrl = baseUrl + `?s=${searchTerm}` + apiKey + `&page=${page}`;
	const res = await axios.get(searchUrl);

	if (res.data.Response === 'True') {
		fetchMoviesListInformation(res.data, searchTerm, page, dispatch);
	} else {
		dispatch({ type: FETCH_MOVIES, payload: {...res.data , searchTerm} });
	}
};

const fetchMoviesListInformation = ({Search, totalResults, Response}, searchTerm, page, dispatch) => {
	let promises = [];

	try {
		for (let i = 0; i < Search.length; i++) {
			const getMovieByIDUrl = baseUrl + `?i=${Search[i].imdbID}` + apiKey;
			promises.push(axios.get(getMovieByIDUrl));
		}
	
		axios.all(promises)
			.then(axios.spread((...args) => {
				const fullDetailedMoviesList = args.map(movie => {
					if (movie.data && movie.data.Response === 'True') {
						return movie.data;
					}
	
					return null;
				});
	
				dispatch({ type: FETCH_MOVIES, payload: {Search: fullDetailedMoviesList, totalResults, searchTerm, page, Response} });
			}));
	} catch(err) {
		console.log(err);
	}

};

export const addMovie = (movie) => async dispatch => {

	dispatch({ type: ADD_MOVIE, payload: movie });
};

export const updateMovie = (movie) => async dispatch => {

	dispatch({ type: UPDATE_MOVIE, payload: movie });
};

export const deleteMovie = (movie) => async dispatch => {

	dispatch({ type: DELETE_MOVIE, payload: movie });
};

export const clearMovies = () => async dispatch => {

	dispatch({ type: CLEAR_MOVIES });
};