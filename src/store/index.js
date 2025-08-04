import { configureStore } from "@reduxjs/toolkit";
import listTodoSlice from './listTodoSlice'
import { loadTodoMiddleware } from "./middleware/loadTodoMiddleware";

export default configureStore({
    reducer: {
        listTodoSlice: listTodoSlice
    },
    middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(loadTodoMiddleware)
})