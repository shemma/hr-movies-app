import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { fetchMoviesList, clearMovies } from '../actions';
import messages from './i18n/App.i18n.es';

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
		this.props.fetchMoviesList(this.props.searchTerm, 1);
	}

	onSearchTermSubmit(searchTerm) {
		if (searchTerm.length > 0) {
			this.props.clearMovies();
			this.props.fetchMoviesList(searchTerm);
		}
	}

	render() {
		const {searchTerm} = this.state;
		const {T} = this.props;

		return (
		<div id='searchBar'>
			<InputGroup className="mb-3">
				<FormControl
					placeholder={T(messages.searchInputText)}
					size="lg"
					value={searchTerm}
					onChange={(e) => this.setState({searchTerm: e.target.value})}
				/>
				<InputGroup.Append>
					<Button className='search-btn' variant="outline-secondary" onClick={() => this.onSearchTermSubmit(searchTerm)}>
					<i className="fas fa-search" /><span>{T(messages.searchBtn)}</span>
					</Button>
				</InputGroup.Append>
			</InputGroup>
		</div>
		);
	}
}

function mapStateToProps({ movies }) {
    return { searchTerm: movies.searchTerm };
}

export default connect(mapStateToProps,{ fetchMoviesList, clearMovies })(SearchBar);
