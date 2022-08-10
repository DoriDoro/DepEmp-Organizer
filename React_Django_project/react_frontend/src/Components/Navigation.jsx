import React from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export default class Navigation extends React.Component {
	render() {
		return (
				<Navbar collapseOnSelect bg="dark" expand="lg" variant="dark">
					<Container fluid>
						<Navbar.Brand 
							className="d-inline p-2 bg-dark text-white" 
							href="/">
								Home
						</Navbar.Brand>

						<Navbar.Toggle 
							aria-controls="navbarScroll" />
						<Navbar.Collapse 
							id="navbarScroll">

							<Nav 
								className="me-auto my-2 my-lg-0" 
								style={{ maxHeight: '100px' }} 
								navbarScroll>
					            <Nav.Link 
					            	className="d-inline p-2 bg-dark text-white" 
					            	href="/department">
					            		Department
					            </Nav.Link>
					            <Nav.Link 
					            	className="d-inline p-2 bg-dark text-white" 
					            	href="/employee">
					            		Employee
					            </Nav.Link>
				          	</Nav>
			          	</Navbar.Collapse>
					</Container>
				</Navbar>
		)
	}
}

