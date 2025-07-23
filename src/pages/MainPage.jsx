import React from 'react'
import { ListTodo } from '../components/ListTodo/ListTodo'
import { ModalFormTodo } from '../components/ModalFormTodo/ModalFormTodo'

export const MainPage = () => {
    return (
        <div>
            <ModalFormTodo />
            <ListTodo value={'MainPage'}/>
        </div>
    )
}
