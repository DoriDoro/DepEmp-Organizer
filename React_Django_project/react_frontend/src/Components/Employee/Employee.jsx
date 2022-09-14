import React from 'react';
import { Table } from 'react-bootstrap';

import { Button, ButtonToolbar } from 'react-bootstrap';

import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee';


export default class Employee extends React.Component {
	constructor(props) {
		super(props);
		this.state={employees:[], addEmployee:false, editEmployee:false};
	}

	refreshList() {
		fetch(process.env.REACT_APP_API+'employee/')
		.then(response => response.json())
		.then(data => {
			this.setState({employees:data});
		});
	}

	componentDidMount() {
		this.refreshList();
	}

	deleteEmployee(employeeid) {
		if(window.confirm('Are you sure?')) {
			fetch(process.env.REACT_APP_API+'employee/'+employeeid, {
				method:'DELETE',
				header:{'Accept': 'application/json', 'Content-Type': 'application/json'}
			})
			this.refreshList();
		}
	}

	render() {
	const { employees, employeeid, employeename, department, photofilename, dateofjoining } = this.state;
	let addEmployeeClose = () => this.setState({addEmployee:false}, this.refreshList());
	let editEmployeeClose = () => this.setState({editEmployee:false}, this.refreshList());

		return (
			<div>
				<Table 
					className="mt-4" 
					striped bordered hover size="sm">
					<thead>
						<tr>
							<th>Employee Id</th>
							<th>Employee Name</th>
							<th>Department</th>
							<th>Joining Date</th>
							<th>Options</th>
						</tr>
					</thead>

					<tbody>
						{employees.map(emp => 
							<tr key = {emp.EmployeeId}>
								<td>{emp.EmployeeId}</td>
								<td>{emp.EmployeeName}</td>
								<td>{emp.Department}</td>
								<td>{emp.DateOfJoining}</td>
								<td>
									<ButtonToolbar>
										<Button
											className="mr-2"
											variant="info"
											onClick={() => this.setState(
												{editEmployee:true, 
													employeeid:emp.EmployeeId, 
													employeename:emp.EmployeeName,
													department:emp.Department,
													photofilename:emp.PhotoFileName,
													dateofjoining:emp.DateOfJoining})}>
												Edit
										</Button>

										<Button
											className="mr-2"
											variant="danger"
											onClick={() => this.deleteEmployee(emp.EmployeeId)}>
												Delete
										</Button>

										<EditEmployee
											show={this.state.editEmployee}
											onHide={editEmployeeClose}
											employeeid={employeeid}
											employeename={employeename}
											department={department}
											photofilename={photofilename}
											dateofjoining={dateofjoining} />
									</ButtonToolbar>
								</td>
							</tr>)}
					</tbody>
				</Table>

				<ButtonToolbar>
					<Button 
						variant="primary"
						onClick= {() => this.setState({addEmployee:true})}>
							Add Employee
					</Button>

					<AddEmployee 
						show={this.state.addEmployee}
						onHide={addEmployeeClose} />
				</ButtonToolbar>

			</div>
		)
	}
}

