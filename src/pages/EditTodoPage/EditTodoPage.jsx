import { Input, Switch, Space, Button, Modal, Typography, message, Flex, Form, } from 'antd'
import { CheckOutlined, CloseOutlined, StarFilled, StarOutlined, } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { updateTodoList } from '../../storage/storage'
import { useDispatch, useSelector } from 'react-redux'
import { updateListTodoSlice } from '../../store/listTodoSlice'
import TextArea from 'antd/es/input/TextArea'
import styles from './EditTodoPage.module.css'
import { selectorTodoById } from '../../store/selectorTodoById'

export const EditTodoPage = () => {
    const { id } = useParams()
    const [messageApi, contextHolder] = message.useMessage()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const todo = useSelector((state) => selectorTodoById(state, id))
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const syncTodoList = (updatedList) => {
        updateTodoList(updatedList)
        dispatch(updateListTodoSlice(updatedList))
    }

    const updateField = (field, value) => {
        const updatedList = todoList.map((item) =>
            item.id === id ? { ...item, [field]: value } : item
        )
        syncTodoList(updatedList)
        setTodo((prev) => ({ ...prev, [field]: value }))
    }

    const saveFunction = async (values) => {
        setLoading(true)
        const updatedList = todoList.map((item) =>
            item.id === id ? { ...item, ...values } : item
        )
        syncTodoList(updatedList)
        setTodo((prev) => ({ ...prev, ...values }))
        messageApi.success('Задача успешно обновлена')
        setLoading(false)
    }

    const deleteTodo = () => {
        updateField('isDeleted', true)
        setIsModalOpen(false)
        navigate('/')
    }

    if (!todo) return <h1>todo нет</h1>

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
                    <Form.Item name="title">
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

                <Space>
                    <Typography.Paragraph>
                        Задача {todo.isActive ? 'активна' : 'выполнена'}
                        <Switch
                            className={styles.switchMargin}
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            checked={todo.isActive}
                            onChange={() =>
                                updateField('isActive', !todo.isActive)
                            }
                        />
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        Избранная задача {todo.isFavorite ? 'да' : 'нет'}
                        <Switch
                            className={styles.switchMargin}
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                            checked={todo.isFavorite}
                            onChange={() =>
                                updateField('isFavorite', !todo.isFavorite)
                            }
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