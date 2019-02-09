import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { updateMovie, addMovie } from '../../actions';
import "react-datepicker/dist/react-datepicker.css";
let initializeForm = false;

class MovieAddEditFormView extends Component {
	constructor(props) {
		super(props);

		this.renderDatePicker = this.renderDatePicker.bind(this);
		this.renderField = this.renderField.bind(this);
	}

	componentDidUpdate() {
		const { selectedMovie, scope } = this.props;

		if (selectedMovie && selectedMovie !== null && scope === 'Edit' && !initializeForm) {
			this.props.initialize({
				title: selectedMovie.Title,
				runTime: selectedMovie.Runtime.replace(/\D/g,''),
				genre: selectedMovie.Genre,
				director: selectedMovie.Director,
				released: selectedMovie.Released
			});
			initializeForm = true;
		}
	}

	componentWillUnmount() {
		initializeForm = false;
	}

	renderField({input, meta: {touched, error}, label, type }) {
		return (
			<div className="form-group">
				<label>{label}</label>
				<input className="form-control" type={type} {...input} />
				<div className="text-danger">
					{touched ? error : '' }
				</div>
			</div>
		);
	}

	renderDatePicker({input, meta: {touched, error}, label }) {
		return (
			<div className="form-group">
				<label>{label}</label>
				<DatePicker 
					{...input}
					className="form-control"
					showYearDropdown
					value={input.value ? new Date(input.value).toLocaleDateString() : 'Select Date'}
				/>
				<div className="text-danger">
					{touched ? error : '' }
				</div>
			  </div>
		);
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<Field
					label='Title'
					name='title'
					type='text'
					component={this.renderField}
				/>
				<Field
					label='Released Year'
					name='released'
					component={this.renderDatePicker}
				/>
				<Field
					label='Run Time (minutes)'
					name='runTime'
					type='number'
					component={this.renderField}
				/>
				<Field
					label='Genre'
					name='genre'
					type='text'
					component={this.renderField}
				/>
				<Field
					label='Director'
					name='director'
					type='text'
					component={this.renderField}
				/>

				<Button variant="secondary" onClick={this.props.onHide}>Cancel</Button>
				<Button type="submit" className="float-right" variant="primary">Save changes</Button>
			</form>
		);
	}

	onSubmit(values) {
		const {movies, selectedMovie, scope} = this.props;
		const selected = selectedMovie ? selectedMovie : {};
		let submitError = false;

		movies.forEach(movie => {
			if(selected.imdbID !== movie.imdbID && values.title === movie.Title) {
				submitError = true;
			}
		});

		if(submitError) {
			throw new SubmissionError({title: 'Movie name already exist'});
		}
		
		const movieObject = {
			Director: values.director,
			Genre: values.genre,
			Runtime: values.runTime + 'min',
			Title: values.title,
			Year: (new Date(values.released).getFullYear()),
		};

		if (scope === 'Edit') {
			this.props.updateMovie({...movieObject, id: selectedMovie.imdbID});
		} else if (scope === 'Add') {
			this.props.addMovie({...movieObject, Poster: 'N/A', imdbID: Math.floor(Math.random() * 100000)});
		}


		this.props.onHide();
	}
}

function validate(values) {
	const errors = {};

	if (!values.title || values.title.length < 3) {
		errors.title = "Enter a title that is at least 3 characters!";
	}
	if (!values.runTime || values.runTime.length > 3) {
		errors.runTime = "Please populate valid Run Time";
	}
	if (!values.genre) {
		errors.genre = "Please populate Genre";
	}
	if (!values.director) {
		errors.director = "Please populate Director";
	}

	const releasedDate = new Date(values.released);
	if (!values.released || (Object.prototype.toString.call(releasedDate) === "[object Date]" && isNaN(releasedDate.getTime()))) {
		errors.released = "Please populate Year";
	}

	return errors;
}

function mapStateToProps({movies}) {
	return { movies: movies.Search };
}

export default reduxForm({
	validate,
	form: 'AddEditMovieForm'
})(
	connect(mapStateToProps, {updateMovie, addMovie})(MovieAddEditFormView)
);
