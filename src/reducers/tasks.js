import * as types from './../constants/ActionTypes'

var randomId = () => {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16)
}
var data = JSON.parse(localStorage.getItem('tasks'))
var initialState = data ? data : []

var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LIST_ALL:
      return state
    case types.ADD_TASK:
      var newTask = {
        id: randomId(),
        name: action.task.name,
        status: action.task.status === 'true' ? true : false,
      }
      state.push(newTask)
      localStorage.setItem('tasks', JSON.stringify(state))
      return [...state]
    default:
      return state
  }
}

export default myReducer
