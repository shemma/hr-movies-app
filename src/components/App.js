import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

import Header from './Header';
import SearchBar from './SearchBar';
import MoviesMainView from './movies/MoviesMainView';

class App extends Component {
  render() {

    return (
      <React.Fragment>
        <Header />
        <Container>
          <SearchBar />
          <MoviesMainView />
        </Container>
      </React.Fragment>

    );
  }
}

export default App;
