import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { injectIntl } from "react-intl";

import Header from './Header';
import SearchBar from './SearchBar';
import MoviesMainView from './movies/MoviesMainView';

class App extends Component {
  render() {
    const {intl:{formatMessage}} = this.props;

    return (
      <React.Fragment>
        <Header T={formatMessage} />
        <Container>
          <SearchBar T={formatMessage} />
          <MoviesMainView T={formatMessage} />
        </Container>
      </React.Fragment>
    );
  }
}

export default injectIntl(App);
