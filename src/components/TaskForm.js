import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from './../actions/index'
class TaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      name: '',
      status: false,
    }
  }

  componentWillMount() {
    if (this.props.task) {
      this.setState({
        id: this.props.task.id,
        name: this.props.task.name,
        status: this.props.task.status,
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.task) {
      this.setState({
        id: nextProps.task.id,
        name: nextProps.task.name,
        status: nextProps.task.status,
      })
    } else if (!nextProps.task) {
      this.setState({
        id: '',
        name: '',
        status: false,
      })
    }
  }

  handleChange = (event) => {
    var target = event.target
    var name = target.name
    var value = target.value

    this.setState({
      [name]: value,
    })
    // console.log(this.state)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    // this.props.onSubmit(this.state)
    this.props.onAddTask(this.state)
    this.onClear()
    this.onCloseForm()
  }

  onCloseForm = () => {
    this.props.onCloseForm()
  }

  onClear = () => {
    this.setState({
      name: '',
      status: false,
    })
  }

  render() {
    var { id } = this.state
    return (
      <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
        <div className="panel panel-warning">
          <div className="panel-heading">
            <h3 className="panel-title">
              {id !== '' ? 'Cập nhật công việc' : 'Thêm Công Việc'}
              <span className="fa fa-times-circle f-right" onClick={this.onCloseForm}></span>
            </h3>
          </div>
          <div className="panel-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Tên :</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </div>
              <label>Trạng Thái :</label>
              <select
                className="form-control"
                name="status"
                value={this.state.status}
                onChange={this.handleChange}
              >
                <option value={true}>Done</option>
                <option value={false}>Hidden</option>
              </select>
              <br />
              <div className="text-center">
                <button type="submit" className="btn btn-warning">
                  Thêm
                </button>
                &nbsp;
                <button type="button" className="btn btn-danger" onClick={this.onClear}>
                  Hủy Bỏ
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onAddTask: (task) => {
      console.log(task)
      dispatch(actions.addTask(task))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm)
