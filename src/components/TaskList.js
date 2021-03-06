import React, { Component } from 'react'
import TaskItem from './TaskItem'
import { connect } from 'react-redux'
import * as actions from './../actions/index'
class TaskList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterName: '',
      filterStatus: -1, // all: -1, active: 1, deactive: 0
    }
  }

  componentDidMount() {
    console.log('tesst')
  }

  onChange = (event) => {
    var target = event.target
    var name = target.name
    var value = target.type == 'checkbox' ? target.checked : target.value
    var filter = {
      name: name === 'filterName' ? value : this.state.filterName,
      status: name === 'filterStatus' ? value : this.state.filterStatus,
    }
    this.props.onFilterTable(filter)
    this.setState({
      [name]: value,
    })
  }

  render() {
    var { tasks, filterTable, keyword, sort } = this.props
    // filter on table
    if (filterTable.name) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(filterTable.name.toLowerCase()) !== -1
      })
    }

    tasks = tasks.filter((task) => {
      if (filterTable.status === -1) {
        return task
      } else {
        return task.status === (filterTable.status === 1 ? true : false)
      }
    })

    // search
    tasks = tasks.filter((task) => {
      return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
    })

    // sort
    if (sort.by === 'name') {
      tasks.sort((a, b) => {
        if (a.name > b.name) return sort.value
        else if (a.name < b.name) return -sort.value
        else return 0
      })
    } else {
      tasks.sort((a, b) => {
        if (a.status > b.status) return -sort.value
        else if (a.status < b.status) return sort.value
        else return 0
      })
    }

    var elmTasks = tasks.map((task, index) => {
      return <TaskItem key={task.id} index={index} task={task} />
    })

    return (
      <div className="row mt-15">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th className="text-center">STT</th>
                <th className="text-center">T??n</th>
                <th className="text-center">H??nh ???nh</th>
                <th className="text-center">S??? l?????ng</th>
                <th className="text-center">Tr???ng Th??i</th>
                <th className="text-center">H??nh ?????ng</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    name="filterName"
                    value={this.state.filterName}
                    onChange={this.onChange}
                  />
                </td>
                <td></td>
                <td></td>
                <td>
                  <select
                    className="form-control"
                    name="filterStatus"
                    value={this.state.filterStatus}
                    onChange={this.onChange}
                  >
                    <option value={-1}>T???t C???</option>
                    <option value={0}>Hidden</option>
                    <option value={1}>Done</option>
                  </select>
                </td>
                <td></td>
              </tr>
              {elmTasks}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    filterTable: state.filterTable,
    keyword: state.search,
    sort: state.sort,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onFilterTable: (filter) => {
      dispatch(actions.filterTask(filter))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)
