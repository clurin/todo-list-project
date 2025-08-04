import { createSlice } from "@reduxjs/toolkit";

const listTodoSlice = createSlice({
    name: 'listTodoSlice',
    initialState: { listTodo: [] },

    reducers: {
        updateListTodoSlice: (state, action) => {
            state.listTodo = action.payload
        }
    }
})

export const { updateListTodoSlice } = listTodoSlice.actions
export default listTodoSlice.reducer