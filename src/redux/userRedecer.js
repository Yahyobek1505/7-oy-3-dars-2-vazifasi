const defaultState = {
  users: [],
};

export function userReducer(state = defaultState, action) {
  if (action.type == "ADD_USER") {
    let copied = JSON.parse(JSON.stringify(state.users));
    copied.push(action.payload);
    return {...state, users: copied}
  } else if (action.type == "DELETE_USER") {
    let copied = JSON.parse(JSON.stringify(state.users));
    copied = copied.filter(el => {
      return el.id != action.payload
    })
    return {...state, users: copied}
  } else if (action.type == "UPDATE_USER") {

  } else {
  }
  return state;
}
