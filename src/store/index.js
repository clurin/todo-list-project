import { configureStore } from "@reduxjs/toolkit";
import listTodoSlice from './listTodoSlice'

export default configureStore({
    reducer: {
        listTodoSlice: listTodoSlice
    }
})