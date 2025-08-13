import { Input, Switch, Space, Button, Modal, Typography, message, Flex, Form, } from 'antd'
import { CheckOutlined, CloseOutlined, StarFilled, StarOutlined, } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'
import { getTodoList, updateTodoList } from '../../storage/storage'
import { useDispatch } from 'react-redux'
import { updateListTodoSlice } from '../../store/listTodoSlice'
import TextArea from 'antd/es/input/TextArea'
import styles from './EditTodoPage.module.css'

export const EditTodoPage = () => {
    const [messageApi, contextHolder] = message.useMessage()
    const [isModalOpen, setIsModalOpen] = useState()
    const [loading, setLoading] = useState()
    const [todo, setTodo] = useState()
    const [todoList, setTodoList] = useState([])
    const [form] = Form.useForm()
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const list = getTodoList()
        setTodoList(list)
    }, [])

    useEffect(() => {
        if (!id || !todoList.length) return
        const foundTodo = todoList.find((item) => item.id === id)
        setTodo(foundTodo || null)
    }, [id, todoList])

    const syncTodoList = useCallback((updatedList) => {
        setTodoList(updatedList)
        updateTodoList(updatedList)
        dispatch(updateListTodoSlice(updatedList))
    }, [dispatch])

    const updateField = useCallback((field, value) => {
        const updatedList = todoList.map((item) =>
            item.id === id ? { ...item, [field]: value } : item
        )
        syncTodoList(updatedList)
        setTodo((prev) => prev ? { ...prev, [field]: value } : prev)
    }, [id, todoList, syncTodoList])

    const saveFunction = async (values) => {
        if (!todo) return
        setLoading(true)

        const updatedList = todoList.map((item) =>
            item.id === id ? { ...item, ...values } : item
        )
        syncTodoList(updatedList)
        setTodo((prev) => prev ? { ...prev, ...values } : prev)

        messageApi.success('Задача успешно обновлена')
        setLoading(false)
    }

    const deleteTodo = () => {
        updateField('isDeleted', true)
        setIsModalOpen(false)
        navigate('/')
    }

    if (!todo) {
        return <h1>Задача не найдена</h1>
    }

    return (
        <div className={styles.container}>
            <Flex className={styles.flexColumn}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={saveFunction}
                    initialValues={{
                        title: todo.title,
                        description: todo.description || '',
                    }}
                >
                    <Form.Item
                        name="title"
                        rules={[{ required: true, message: 'Введите название задачи' }]}
                    >
                        <Input maxLength={256} />
                    </Form.Item>

                    {todo.isFavorite ? <StarFilled /> : <StarOutlined />}

                    <Form.Item name="description">
                        <TextArea
                            showCount
                            maxLength={1024}
                            placeholder="Опишите задачу"
                            className={styles.textArea}
                        />
                    </Form.Item>

                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                    >
                        Сохранить изменения
                    </Button>
                </Form>

                <Space direction="vertical" size="middle">
                    <Typography.Paragraph>
                        Задача {todo.isActive ? 'активна' : 'выполнена'}
                        <Switch
                            className={styles.switchMargin}
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            checked={todo.isActive}
                            onChange={() => updateField('isActive', !todo.isActive)}
                        />
                    </Typography.Paragraph>

                    <Typography.Paragraph>
                        Избранная задача {todo.isFavorite ? 'да' : 'нет'}
                        <Switch
                            className={styles.switchMargin}
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            checked={todo.isFavorite}
                            onChange={() => updateField('isFavorite', !todo.isFavorite)}
                        />
                    </Typography.Paragraph>
                </Space>

                {contextHolder}

                <Button danger onClick={() => setIsModalOpen(true)}>
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