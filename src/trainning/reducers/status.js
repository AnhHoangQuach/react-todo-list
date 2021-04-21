var initialState = false;

//reducer phan tich action
var myReducer = (state = initialState, action) => {
    if (action.type === 'TOGGLE_STATUS') {
        state = !state
    }
    return state;
}