import {
  ADD_TODO,
  CLEAR_EDIT,
  EDIT_TODO,
  GET_TODO,
  REMOVE_TODO,
  TODOS_ERROR,
  UPDATE_TODO,
} from "../constants";

export default (state, { type, payload }) => {
  switch (type) {
    case GET_TODO:
      return {
        ...state,
        todos: payload,
        errors: null,
      };

    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, payload],
      };

    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== payload),
      };

    case UPDATE_TODO:
      const updateTodo = payload;
      const updateTodos = state.todos.map(todo => {
        if(todo.id === updateTodo._id){
          return updateTodo
        }
        return todo
      })
      return {
       todos:updateTodos
      };

    case EDIT_TODO:
      return {
        ...state,
        editAble: payload,
      };

    case CLEAR_EDIT:
      return {
        ...state,
        errors: null,
      };

    case TODOS_ERROR:
      return {
        ...state,
        todos: [],
        errors: payload,
      };

    default:
      return state;
  }
};
