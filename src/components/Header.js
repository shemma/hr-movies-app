import React from 'react';
import { Navbar } from 'react-bootstrap';

import '../css/header.scss';

const Header = () => {
  return (
	<div id='application-header'>
		<Navbar bg="light" expand="lg">
			<Navbar.Brand>Movies</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav" />
		</Navbar>
	</div>
  );
};

export default Header;
