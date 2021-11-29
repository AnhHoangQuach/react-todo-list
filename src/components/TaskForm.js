import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from './../actions/index'
class TaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      name: '',
      image: '',
      quantity: 0,
      status: false,
    }
  }

  componentWillMount() {
    if (this.props.itemEditing && this.props.itemEditing.id !== null) {
      this.setState({
        id: this.props.itemEditing.id,
        name: this.props.itemEditing.name,
        status: this.props.itemEditing.status,
      })
    } else {
      this.onClear()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.itemEditing) {
      this.setState({
        id: nextProps.itemEditing.id,
        name: nextProps.itemEditing.name,
        status: nextProps.itemEditing.status,
      })
    } else {
      this.onClear()
    }
  }

  handleChange = (event) => {
    var target = event.target
    var name = target.name
    var value = target.value

    if (name === 'status') {
      value = target.value === 'true' ? true : false
    }

    this.setState({
      [name]: value,
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.props.onSaveTask(this.state)
    this.onClear()
    this.onExitForm()
  }

  onExitForm = () => {
    this.props.onCloseForm()
  }

  onClear = () => {
    this.setState({
      name: '',
      status: false,
    })
    this.props.onCloseForm()
  }

  render() {
    if (!this.props.isDisplayForm) return ''
    return (
      <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
        <div className="panel panel-warning">
          <div className="panel-heading">
            <h3 className="panel-title">
              {this.state.id !== '' ? 'Cập nhật Sản Phẩm' : 'Thêm Sản Phẩm'}
              <span className="fa fa-times-circle f-right" onClick={this.onExitForm}></span>
            </h3>
          </div>
          <div className="panel-body">
            <form onSubmit={this.onSubmit}>
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
              <div className="form-group">
                <label>Hình ảnh :</label>
                <input
                  type="text"
                  className="form-control"
                  name="image"
                  value={this.state.image}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Số lượng :</label>
                <input
                  type="number"
                  className="form-control"
                  name="quantity"
                  value={this.state.quantity}
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
                  {this.state.id !== '' ? 'Cập nhật' : 'Thêm'}
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
  return { isDisplayForm: state.isDisplayForm, itemEditing: state.itemEditing }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSaveTask: (task) => {
      dispatch(actions.saveTask(task))
    },
    onCloseForm: () => {
      dispatch(actions.closeForm())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm)
