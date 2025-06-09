import { Button, Input, Modal } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useState } from 'react'
import { getTodoList, updateTodoList } from '../storage/storage'

export const ModalFormTodo = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [titleValue, setTitleValue] = useState('')
    const [descriptionValue, setDescriptionValue] = useState('')
    const todoList = getTodoList()

    const showModal = () => {
        setIsModalOpen(true)
    }

    const addTodo = () => {
        if (!titleValue.trim()) return
        const time = new Date()
        const newTodo = {
            id: String(todoList.todo.length + 1),
            title: titleValue,
            description: descriptionValue,
            createdAt: `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`,
            isActive: true,
            isFavorite: false,
            isDeleted: false
        }

        const currentList = getTodoList().todo
        const updatedList = { todo: [...currentList, newTodo] }
        console.log(updatedList)
        updateTodoList(updatedList)

        setTitleValue('')
        setDescriptionValue('')
        setIsModalOpen(false)
    }

    const cancelFunction = () => {
        setIsModalOpen(false)
        setTitleValue('')
        setDescriptionValue('')
    }

    return (
        <div>
            <Button onClick={showModal}>
                Добавить задачу
            </Button>
            <Modal
                title="Добавить новую задачу"
                open={isModalOpen}
                onOk={addTodo}
                onCancel={cancelFunction}
                okText="Добавить"
                cancelText="Закрыть">
                <div style={{ margin: '20px 0' }}>
                    <Input
                        placeholder='Заголовок'
                        value={titleValue}
                        onChange={(e) => setTitleValue(e.target.value)}
                    />
                </div>
                <div style={{ margin: '20px 0' }}>
                    <TextArea
                        placeholder='Описание'
                        style={{ height: '120px', resize: 'none' }}
                        value={descriptionValue}
                        onChange={(e) => setDescriptionValue(e.target.value)}
                    />
                </div>
            </Modal>
        </div>
    )
}
