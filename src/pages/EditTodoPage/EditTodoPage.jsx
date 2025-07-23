import { Input, Switch, Space, Button, Modal, Typography, message, Flex } from 'antd'
import { CheckOutlined, CloseOutlined, StarFilled, StarOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getTodoList, updateTodoList } from '../../storage/storage'
import { useDispatch } from 'react-redux'
import { updateListTodoSlice } from '../../store/listTodoSlice'
import TextArea from 'antd/es/input/TextArea'
import styles from './EditTodoPage.module.css'

export const EditTodoPage = () => {
    const [messageApi, contextHolder] = message.useMessage()
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { id } = useParams()
    const [todo, setTodo] = useState()
    const [todoList, setTodoList] = useState(getTodoList())
    const [tempTitle, setTempTitle] = useState('')
    const [tempDescription, setTempDescription] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        if (todoList) {
            const foundTodo = todoList.find((item) => item.id === id)
            if (foundTodo) {
                setTodo(foundTodo)
                setTempTitle(foundTodo.title)
                setTempDescription(foundTodo.description || '')
            }
        }
    }, [id, todoList])

    if (!todo) return <h1>todo нет</h1>

    const saveFunction = () => {
        messageApi.info('Задача успешно обновлена')
        const updatedTodoList = todoList.map((item) => item.id === id ? { ...item, title: tempTitle, description: tempDescription } : item)
        setTodoList(updatedTodoList)
        updateTodoList(updatedTodoList)
        dispatch(updateListTodoSlice(updatedTodoList))
        setTodo((item) => ({ ...item, title: tempTitle, description: tempDescription }))
    }

    const switchStatus = () => {
        const updatedTodoList = todoList.map((item) => item.id === id ? { ...item, isActive: !item.isActive } : item)
        setTodoList(updatedTodoList)
        updateTodoList(updatedTodoList)
        dispatch(updateListTodoSlice(updatedTodoList))
        setTodo((item) => ({ ...item, isActive: !item.isActive }))
    }

    const switchFavorite = () => {
        const updatedTodoList = todoList.map((item) => item.id === id ? { ...item, isFavorite: !item.isFavorite } : item)
        setTodoList(updatedTodoList)
        updateTodoList(updatedTodoList)
        dispatch(updateListTodoSlice(updatedTodoList))
        setTodo((item) => ({ ...item, isFavorite: !item.isFavorite }))
    }

    const deleteTodo = () => {
        const updatedTodoList = todoList.map((item) => item.id === id ? { ...item, isDeleted: true } : item)
        setTodoList(updatedTodoList)
        updateTodoList(updatedTodoList)
        dispatch(updateListTodoSlice(updatedTodoList))
        setTodo((item) => ({ ...item, isDeleted: true }))
        setIsModalOpen(false)
        navigate('/')
    }

    const showModal = () => setIsModalOpen(true)
    return (
        <div className={styles.container} key={todo.id}>
            <Flex className={styles.flexColumn}>
                <Input
                    value={tempTitle}
                    onChange={(e) => setTempTitle(e.target.value)}
                    maxLength={256}
                />
                {todo.isFavorite ? <StarFilled /> : <StarOutlined />}
                <TextArea
                    showCount
                    maxLength={1024}
                    value={tempDescription}
                    onChange={(e) => setTempDescription(e.target.value)}
                    placeholder="Опишите задачу"
                    className={styles.textArea}
                />
                <Space>
                    <Typography.Paragraph>
                        Задача {todo.isActive ? 'активна' : 'выполнена'}
                        <Switch
                            className={styles.switchMargin}
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            checked={todo.isActive}
                            onChange={switchStatus}
                        />
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        Избранная задача {todo.isFavorite ? 'да' : 'нет'}
                        <Switch
                            className={styles.switchMargin}
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            checked={todo.isFavorite}
                            onChange={switchFavorite}
                        />
                    </Typography.Paragraph>
                </Space>
                {contextHolder}
                <Button type="primary" onClick={saveFunction}>
                    Сохранить изменения
                </Button>
                <Button danger onClick={showModal}>
                    Удалить задачу
                </Button>
                <Modal
                    title="Вы уверены, что хотите удалить эту задачу?"
                    open={isModalOpen}
                    onOk={deleteTodo}
                    onCancel={() => setIsModalOpen(false)}
                    okText="Удалить"
                    cancelText="Отмена"
                />
            </Flex>
        </div>
    )
}
