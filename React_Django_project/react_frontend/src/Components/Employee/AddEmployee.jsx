import React from 'react';

import { Modal, Button, Row, Col, Form, Image } from 'react-bootstrap';


export default class AddEmployee extends React.Component {
	constructor(props) {
		super(props);
		this.state={departments:[]}
		this.handleSubmit=this.handleSubmit.bind(this);
		this.handleFileSelected=this.handleFileSelected.bind(this);
	}

	photofilename = 'book.png';
	imagesrc = process.env.REACT_APP_PHOTOPATH+this.photofilename;

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
			method:'POST',
			headers: {
				'Accept': 'applications/json',
				'Content-Type': 'application/json'
			},
			body:JSON.stringify({
				EmployeeId:null,
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

	handleFileSelected(event) {
		event.preventDefault();
		this.photofilename=event.target.files[0].name;
		const formData = new FormData();
		formData.append(
			"myFile",
			event.target.files[0],
			event.target.files[0].name
		);

		fetch(process.env.REACT_APP_API+'employee/saveFile', {
			method:'POST',
			body:formData
		})
		.then(res => res.json())
		.then((result) => {
			this.imagesrc=process.env.REACT_APP_PHOTOPATH+result;
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
								Add Employee 
						</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<Row>
							<Col sm={6}>
								<Form onSubmit={this.handleSubmit}>
									<Form.Group controlId="EmployeeName">
										<Form.Label>Employee Name</Form.Label>
										<Form.Control 
											type="text" 
											name="EmployeeName" 
											required 
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
											placeholder="Joining Date"
										/>
									</Form.Group>

									<Form.Group>
										<Button 
											variant="primary" 
											type="submit">
												Add Employee
										</Button>
									</Form.Group>
								</Form>
							</Col>

							<Col sm={6}>
								<Image 
									width="200px"
									height="200px"
									src={this.imagesrc} 
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

