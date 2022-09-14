import React from 'react';

import { Modal, Button, Row, Col, Form, Image } from 'react-bootstrap';

export default class EditEmployee extends React.Component {
	constructor(props) {
		super(props);
		this.state={departments:[]}
		this.handleSubmit=this.handleSubmit.bind(this);
	}

	componentDidMount() {
		fetch(process.env.REACT_APP_API+'department/')
		.then(response => response.json())
		.then(data => {
			this.setState({departments:data});
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		fetch(process.env.REACT_APP_API+'employee/', {
			method:'PUT',
			headers: {
				'Accept': 'applications/json',
				'Content-Type': 'application/json'
			},
			body:JSON.stringify({
				EmployeeId:event.target.EmployeeId.value,
				EmployeeName:event.target.EmployeeName.value,
				Department:event.target.Department.value,
				DateOfJoining:event.target.DateOfJoining.value,
				PhotoFileName:this.photofilename
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
								Edit Employee 
						</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<Row>
							<Col sm={6}>
								<Form onSubmit={this.handleSubmit}>
									<Form.Group controlId="EmployeeId">
										<Form.Label>Employee Id</Form.Label>
										<Form.Control 
											type="text" 
											name="EmployeeId" 
											required 
											disabled
											defaultValue = {this.props.employeeid}
											placeholder="Employee Id"/>
									</Form.Group>

									<Form.Group controlId="EmployeeName">
										<Form.Label>Employee Name</Form.Label>
										<Form.Control 
											type="text" 
											name="EmployeeName" 
											required 
											defaultValue = {this.props.employeename}
											placeholder="Employee Name"/>
									</Form.Group>

									<Form.Group controlId="Department">
										<Form.Label>Department</Form.Label>
										<Form.Control as="select">
											{this.state.departments.map((dep) =>
												<option key={dep.DepartmentId} >
													{dep.DepartmentName}
												</option>
											)};
										</Form.Control>
									</Form.Group>

									<Form.Group controlId="DateOfJoining">
										<Form.Label>Joined Date</Form.Label>
										<Form.Control 
											type="date"
											name="DateOfJoining"
											required
											defaultValue = {this.props.dateofjoining}
											placeholder="Joining Date"
										/>
									</Form.Group>

									<Form.Group>
										<Button 
											variant="primary" 
											type="submit">
												Update Employee
										</Button>
									</Form.Group>
								</Form>
							</Col>

							<Col sm={6}>
								<Image 
									width="200px"
									height="200px"
									src={process.env.REACT_APP_PHOTOPATH+this.props.photofilename} 
								/>
								<input onChange={this.handleFileSelected} type="File" />
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

