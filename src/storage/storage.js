import { data_todo } from './data_todo'

if (!localStorage.getItem('todoList')) localStorage.setItem('todoList', JSON.stringify(data_todo))

export const getTodoList = () => {
    const todoList = JSON.parse(localStorage.getItem('todoList'))
    return todoList
}

export const updateTodoList = (newList) => localStorage.setItem('todoList', JSON.stringify(newList))