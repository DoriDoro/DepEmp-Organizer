import React from 'react';

import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export default class AddDepartment extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit=this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		fetch(process.env.REACT_APP_API+'department/', {
			method:'POST',
			headers: {
				'Accept': 'applications/json',
				'Content-Type': 'application/json'
			},
			body:JSON.stringify({
				DepartmentId:null,
				DepartmentName:event.target.DepartmentName.value
			})
		})
		.then(res => res.json())
		.then(result => {
			alert(result);
		},
		(error) => {
			alert('Failed');
		})
	}

	render() {
		return (
			<div className="container">
				<Modal
					{...this.props}
					size="lg"
					aria-labelledby="contained-modal-title-vecenter"
					centered
				>
					<Modal.Header cloosebutton="true">
						<Modal.Title 
							id="contained-modal-title-vecenter">
								Add Department 
						</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<Row>
							<Col sm={6}>
								<Form onSubmit={this.handleSubmit}>
									<Form.Group controlId="DepartmentName">
										<Form.Label>Department Name</Form.Label>
										<Form.Control 
											type="text" 
											name="DepartmentName" 
											required 
											placeholder="Department Name"/>
									</Form.Group>

									<Form.Group>
										<Button 
											variant="primary" 
											type="submit">
												Add Department
										</Button>
									</Form.Group>
								</Form>
							</Col>
						</Row>
					</Modal.Body>

					<Modal.Footer>
						<Button 
							variant="danger" 
							onClick={this.props.onHide}>
								Close
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
			)
	}
}

