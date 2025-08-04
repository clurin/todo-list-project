export const selectorTodoById = (state, id) => {
  return state.listTodoSlice.listTodo.find(todo => todo.id === id)
}