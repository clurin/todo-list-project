import React from 'react'
import { ListTodo } from '../components/ListTodo'
import { ModalFormTodo } from '../components/ModalFormTodo'

export const MainPage = () => {
    return (
        <div>
            <ModalFormTodo />
            <ListTodo value={'MainPage'}/>
        </div>
    )
}
