import { createSlice } from "@reduxjs/toolkit";
import { getTodoList } from "../storage/storage";


const listTodoSlice = createSlice({
    name: 'listTodoSlice',
    initialState: { listTodo: getTodoList() },

    reducers: {
        updateListTodoSlice: (state, action) => {
            state.listTodo = action.payload
        }
    }
})

export const { updateListTodoSlice } = listTodoSlice.actions
export default listTodoSlice.reducer