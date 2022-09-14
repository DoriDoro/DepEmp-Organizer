import React from 'react';
import { Table } from 'react-bootstrap';

import { Button, ButtonToolbar } from 'react-bootstrap';
import AddDepartment from './AddDepartment';
import EditDepartment from './EditDepartment';


export default class Department extends React.Component {
	constructor(props) {
		super(props);
		this.state={departments:[], addDepartment:false, editDepartment:false};
	}

	refreshList() {
		fetch(process.env.REACT_APP_API+'department/')
		.then(response => response.json())
		.then(data => {
			this.setState({departments:data});
		});
	}

	componentDidMount() {
		this.refreshList();
	}

	deleteDepartment(departmentid) {
		if(window.confirm('Are you sure?')) {
			fetch(process.env.REACT_APP_API+'department/'+departmentid, {
				method:'DELETE',
				header:{'Accept': 'application/json', 'Content-Type': 'application/json'}
			})
			this.refreshList()
		}
	}

	render() {
	const { departments, departmentid, departmentname } = this.state;
	let addDepartmentClose = () => this.setState({addDepartment:false});
	let editDepartmentClose = () => this.setState({editDepartment:false});

		return (
			<div>
				<Table 
					className="mt-4" 
					striped bordered hover size="sm">
					<thead>
						<tr>
							<th>Department Id</th>
							<th>Department Name</th>
							<th>Options</th>
						</tr>
					</thead>

					<tbody>
						{departments.map(dep => 
							<tr key = {dep.DepartmentId}>
								<td>{dep.DepartmentId}</td>
								<td>{dep.DepartmentName}</td>
								<td>
									<ButtonToolbar>
										<Button
											className="mr-2"
											variant="info"
											onClick={() => this.setState(
												{editDepartment:true, 
													departmentid:dep.DepartmentId, 
													departmentname:dep.DepartmentName})}>
												Edit
										</Button>

										<Button
											className="mr-2"
											variant="danger"
											onClick={() => this.deleteDepartment(dep.DepartmentId)}>
												Delete
										</Button>

										<EditDepartment
											show={this.state.editDepartment}
											onHide={editDepartmentClose}
											departmentid={departmentid}
											departmentname={departmentname} />
									</ButtonToolbar>
								</td>
							</tr>)}
					</tbody>
				</Table>

				<ButtonToolbar>
					<Button 
						variant="primary"
						onClick= {() => this.setState({addDepartment:true})}>
							Add Department
					</Button>

					<AddDepartment 
						show={this.state.addDepartment}
						onHide={addDepartmentClose} />
				</ButtonToolbar>

			</div>
		)
	}
}

