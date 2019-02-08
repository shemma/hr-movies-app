import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { fetchMoviesList } from '../actions';

import '../css/searchBar.scss';

class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchTerm: ''
		}

		this.onSearchTermSubmit = this.onSearchTermSubmit.bind(this);
	}

	componentWillMount() {
		const initialSearchParam = 'Rings';
		this.props.fetchMoviesList(initialSearchParam);
	}

	onSearchTermSubmit(searchTerm) {
		if (searchTerm.length > 0) {
			this.props.fetchMoviesList(searchTerm);
		}
	}

	render() {
		const {searchTerm} = this.state;

		return (
		<div id='searchBar'>
			<InputGroup className="mb-3">
				<FormControl
					placeholder="Movie Name...(init search Rings)"
					size="lg"
					value={searchTerm}
					onChange={(e) => this.setState({searchTerm: e.target.value})}
				/>
				<InputGroup.Append>
					<Button variant="outline-secondary" onClick={() => this.onSearchTermSubmit(searchTerm)}>Search Movies</Button>
				</InputGroup.Append>
			</InputGroup>
		</div>
		);
	}
}

export default connect(
	null,
	{ fetchMoviesList }
)(SearchBar);
