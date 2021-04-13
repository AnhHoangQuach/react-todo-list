import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';

class App extends Component{
	constructor(props) {
		super(props);
		this.state = { 
			tasks: [],
			isDisplayForm: false,
		}
	}

	componentWillMount() { // chi duoc goi duy nhat 1 lan
		if (localStorage && localStorage.getItem('tasks')) {
			var tasks = JSON.parse(localStorage.getItem('tasks'))
			this.setState({
				tasks: tasks
			})
		}
	}

	onGenerateData = () => {
		var tasks = [
			{
				id: this.randomId(),
				name: 'Learn',
				status: true
			},
			{
				id: this.randomId(),
				name: 'Code',
				status: true
			},
			{
				id: this.randomId(),
				name: 'Sleep',
				status: false
			}
		]
		this.setState({
			tasks: tasks
		})
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}

	randomId() {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16)
	}

	onToggleForm = () => {
		this.setState({
			isDisplayForm: !this.isDisplayForm	
		})
	}

	onCloseForm = () => {
		this.setState({
			isDisplayForm: false	
		})
	}

	render() {
		var { tasks, isDisplayForm } = this.state;
		var elmTaskForm = isDisplayForm ? <TaskForm onCloseForm={this.onCloseForm} /> : '';
		return (
			<div className="container">
				<div className="text-center">
					<h1>Quản Lý Công Việc</h1>
					<hr/>
				</div>
				<div className="row">
					{ elmTaskForm }
					<div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
						<button type="button" className="btn btn-primary" onClick={this.onToggleForm}>
							<span className="fa fa-plus mr-5"></span> Thêm Công Việc
						</button>
						<button type="button" className="btn btn-success ml-5" onClick={ this.onGenerateData }>
							<span className="fa fa-plus mr-5"></span> Generate Data
						</button>
						<Control />
						<TaskList tasks={ tasks }/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
