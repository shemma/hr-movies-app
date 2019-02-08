import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { updateMovie } from '../../actions';

let initializeForm = false;

class MovieEditFormView extends Component {
	componentDidUpdate() {
		const { selectedMovie } = this.props;

		if (selectedMovie && selectedMovie !== null && !initializeForm) {
			this.props.initialize({
				title: selectedMovie.Title,
				year: selectedMovie.Year,
				runTime: selectedMovie.Runtime,
				genre: selectedMovie.Genre,
				director: selectedMovie.Director
			});
			initializeForm = true;
		}
	}

	componentWillUnmount() {
		initializeForm = false;
	}

	renderField(field) {
		const { meta: { touched, error } } = field;
		const className = `form-group ${touched && error ? 'text-danger' : ''}`

		return (
		<div className={className}>
			<label>{field.label}</label>
			<input
			className="form-control"
			type="text"
			{...field.input}
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
					label="Title"
					name="title"
					component={this.renderField}
				/>
				<Field
					label="Year"
					name="year"
					component={this.renderField}
				/>
				<Field
					label="Run Time"
					name="runTime"
					component={this.renderField}
				/>
				<Field
					label="Genre"
					name="genre"
					component={this.renderField}
				/>
				<Field
					label="Director"
					name="director"
					component={this.renderField}
				/>
				
				<Button variant="secondary" onClick={this.props.onHide}>Cancel</Button>
				<Button type="submit" className="float-right" variant="primary">Save changes</Button>
			</form>
		);
	}

	onSubmit(values) {
		const {movies, selectedMovie} = this.props;
		let submitError = false;

		movies.forEach(movie => {
			if(selectedMovie.imdbID !== movie.imdbID && values.title === movie.Title) {
				submitError = true;
			}
		});

		if(submitError) {
			throw new SubmissionError({title: 'Movie name already exist'});
		} else {
			this.props.updateMovie({...values, id: selectedMovie.imdbID});
		}

		this.props.onHide();
	}
}

function validate(values) {
  const errors = {};

  if (!values.title || values.title.length < 3) {
	errors.title = "Enter a title that is at least 3 characters!";
  }
  if (!values.year) {
	errors.year = "Please update Year";
  }
  if (!values.runTime) {
	errors.runTime = "Please update Run Time";
  }
  if (!values.genre) {
	errors.genre = "Please update Genre";
  }
  if (!values.director) {
	errors.director = "Please update Director";
  }

  return errors;
}

function mapStateToProps({movies}) {
	return { movies: movies.Search };
}

export default reduxForm({
  validate,
  form: 'EditMovieForm'
})(
  connect(mapStateToProps, {updateMovie})(MovieEditFormView)
);
