import { Active, FORM_HANDLE_CHANGE, CREATE_TASK, DELETE_TASK, UPDATE_TASK, FORM_INITIAL_VALUE } from "./actions"
const initialState = {
  number: 0,
  active: false,
  formValues: {
    "taskDescription": "",
    "date": "",
    "time": "",
    "assignUser": []
  },
  taskValues: []
};
function reducer(state = initialState, action) {
  switch (action.type) {
    case Active:
      return {
        ...state,
        active: action.value
      };
    case FORM_HANDLE_CHANGE:
      return {
        ...state,
        formValues: action
      };
    case FORM_INITIAL_VALUE:
      return {
        ...state,
        formValues: initialState.formValues
      };
    case CREATE_TASK:
      const cureentValue = state.taskValues;
      cureentValue.push(action.value)
      return {
        ...state,
        taskValues: cureentValue
      };
    case UPDATE_TASK:
      const updatedTask = state.taskValues.map(t => t.id === action.value.id ? action.value : t);
      return {
        ...state,
        taskValues: updatedTask
      };
    case DELETE_TASK:
      const task = JSON.parse(JSON.stringify(state.taskValues));
      const index = task.findIndex(task => task.id === action.id);
      task.splice(index, 1);
      return {
        ...state,
        taskValues: task
      };
    default:
      return state;
  }
}
export default reducer;