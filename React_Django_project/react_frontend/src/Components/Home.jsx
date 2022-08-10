import React from 'react';


export default class Home extends React.Component {
	render() {
		return ( 
			<div className="mt-5 d-flex justify-content-left">
				This React Frontend and Django Backend application has the funcitonality of 
				adding, editing and deletetion of departments and employyes. The departments 
				has just a name. But the employyes has name, department, date of joining and
				a photo attribute. 
			</div>
		)
	}
}

