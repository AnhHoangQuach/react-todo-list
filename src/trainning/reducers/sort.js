var initialState = {
    by: 'name',
    value: 1
}

//reducer phan tich action
var myReducer = (state = initialState, action) => {
    if (action.type === 'SORT') {
        var { by, value } = action.sort;
        return { by , value } 
    }
    return state;
}