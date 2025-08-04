import { getTodoList } from "../../storage/storage"
import { updateListTodoSlice } from "../listTodoSlice"

export const loadTodoMiddleware = (store) => (next) => (action) => {
    if (action.type === 'INIT_TODO_LIST') {
        const todoList = getTodoList()
        store.dispatch(updateListTodoSlice(todoList))
    }

    return next(action)
}
