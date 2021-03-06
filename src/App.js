import React, { Component } from 'react'
import './App.css'
import TaskForm from './components/TaskForm'
import TaskControl from './components/TaskControl'
import TaskList from './components/TaskList'
import { connect } from 'react-redux'
import * as actions from './actions/index'

class App extends Component {
  constructor(props) {
    super(props)
  }

  onToggleForm = () => {
    var { itemEditing } = this.props
    if (itemEditing && itemEditing.id !== '') {
      // this.props.onOpenForm();
      this.props.onClearTask({
        id: '',
        name: '',
        image: '',
        status: false,
      })
    } else {
      this.props.onToggleForm()
    }
  }

  render() {
    var { isDisplayForm } = this.props
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Sản Phẩm</h1>
          <hr />
        </div>
        <div className="row">
          <TaskForm />
          <div
            className={
              isDisplayForm
                ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8'
                : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'
            }
          >
            <button type="button" className="btn btn-primary" onClick={this.onToggleForm}>
              <span className="fa fa-plus mr-5"></span> Thêm Sản Phẩm
            </button>
            <TaskControl />
            <TaskList />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isDisplayForm: state.isDisplayForm,
    itemEditing: state.itemEditing,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onToggleForm: () => {
      dispatch(actions.toggleForm())
    },
    onClearTask: (task) => {
      dispatch(actions.editTask(task))
    },
    onOpenForm: () => {
      dispatch(actions.openForm())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
