import { getTodoList, updateTodoList } from '../storage/storage'
import { updateListTodoSlice } from '../store/listTodoSlice'

export const addTodoHandler = (values, dispatch) => {
    const currentList = getTodoList()
    const newTodo = {
        id: String(currentList.length + 1),
        title: values.title,
        description: values.description,
        createdAt: `${Date.now()}`,
        isActive: true,
        isFavorite: false,
        isDeleted: false,
    }

    const updatedList = [...currentList, newTodo]
    updateTodoList(updatedList)
    dispatch(updateListTodoSlice(updatedList))
}