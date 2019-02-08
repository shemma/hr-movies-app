import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

import Header from './Header';
import SearchBar from './SearchBar';
import MoviesMainView from './movies/MoviesMainView';

class App extends Component {
  render() {
    return (
      <Container>
        <Header />
        <SearchBar />
        <MoviesMainView />
      </Container>
    );
  }
}

export default App;
