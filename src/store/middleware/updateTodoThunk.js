import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateTodoList } from "../../storage/storage";
import { updateListTodoSlice } from "../listTodoSlice";


export const updateTodoThunk = createAsyncThunk('todos/update', ({ id, changes }, { getState, dispatch }) => {
    const todos = getState().listTodoSlice.listTodo
    const updatedTodos = todos.map((item) => item.id === id ? { ...item, ...changes } : item)
    updateTodoList(updatedTodos)
    dispatch(updateListTodoSlice(updatedTodos))
})