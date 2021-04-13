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
			filter: {
				name: '',
				status: -1,
			},
			keyword: '',
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

	randomId() {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16)
	}

	onFilter = (filterName, filterStatus) => {
		console.log(filterName, filterStatus)
		filterStatus = parseInt(filterStatus, 10)
		this.setState({
			filter: {
				name: filterName.toLowerCase(),
				status: filterStatus,
			}
		})
	}

	onToggleForm = () => {
		if(this.state.isDisplayForm && this.state.taskEditing !== null) {
			this.setState({
				isDisplayForm: true,
				taskEditing: null,
			})
		} else {
			this.setState({
				isDisplayForm: !this.isDisplayForm,
				taskEditing: null,
			})
		}
	}

	onCloseForm = () => {
		this.setState({
			isDisplayForm: false	
		})
	}

	onShowForm = () => {
		this.setState({
			isDisplayForm: true	
		})
	}

	onSubmit = (data) => {
		var { tasks } = this.state;
		if (data.id === "") {
			data.id = this.randomId();
			tasks.push(data);
		} else {
			var index = this.findIndex(data.id);
			tasks[index] = data;
		}
		this.setState({
			tasks: tasks,
			taskEditing: null,
		})
		localStorage.setItem('tasks', JSON.stringify(tasks))
	}

	onUpdateStatus = (id) => {
		var { tasks } = this.state;
		var index = this.findIndex(id);
		if (index !== -1) {
			tasks[index].status = !tasks[index].status
			this.setState({
				tasks: tasks
			})
			localStorage.setItem('tasks', JSON.stringify(tasks))
		}
	}

	onDelete = (id) => {
		var { tasks } = this.state;
		var index = this.findIndex(id);
		if (index !== -1) {
			tasks.slice(index, 1);
			this.setState({
				tasks: tasks
			})
			localStorage.setItem('tasks', JSON.stringify(tasks))
		}
		this.onCloseForm();
	}

	onUpdate = (id) => {
		var { tasks } = this.state;
		var index = this.findIndex(id);
		var taskEditing = tasks[index];
		this.setState({
			taskEditing: taskEditing
		})
		this.onShowForm();
	}

	findIndex = (id) => {
		var { tasks } = this.state;
		var result = -1;
		tasks.forEach((task, index) => {
			if(task.id === id) {
				result = index;
			}
		})
		return result;
	}

	onSearch = (keyword) => {
		console.log(keyword)
	}

	render() {
		var { tasks, isDisplayForm, taskEditing, filter } = this.state;
		if(filter) {
			if (filter.name) {
				tasks = tasks.filter((task) => {
					return task.name.toLowerCase().indexOf(filter.name) !== -1;
				})
			}
			tasks = tasks.filter((task) => {
				if(filter.status === -1) {
					return task;
				} else {
					return task.status === (filter.status === 1 ? true : false)
				}
			})
		}
		var elmTaskForm = isDisplayForm ? <TaskForm onSubmit={this.onSubmit} onCloseForm={this.onCloseForm} task={taskEditing} /> : '';
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
						<Control onSearch={this.onSearch}/>
						<TaskList tasks={ tasks } onFilter={this.onFilter} onUpdate={this.onUpdate} onUpdateStatus={this.onUpdateStatus} onDelete={this.onDelete}/>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
