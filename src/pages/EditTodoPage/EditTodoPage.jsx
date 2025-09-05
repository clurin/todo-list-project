import { Input, Switch, Space, Button, Modal, Typography, message, Flex, Form, } from 'antd'
import { CheckOutlined, CloseOutlined, StarFilled, StarOutlined, } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TextArea from 'antd/es/input/TextArea'
import styles from './EditTodoPage.module.css'
import { updateTodoThunk } from '../../store/middleware/updateTodoThunk'

export const EditTodoPage = () => {
    const { id } = useParams()
    const [messageApi, contextHolder] = message.useMessage()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const todoList = useSelector((state) => state.listTodoSlice.listTodo)
    const todo = todoList.find((item) => item.id === id)
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const updateField = useCallback((field, value) => {
        dispatch(updateTodoThunk({ id, changes: { [field]: value } }))
    }, [dispatch, id])

    const saveFunction = async (values) => {
        setLoading(true)

        dispatch(updateTodoThunk({ id, changes: values }))

        messageApi.success('Задача успешно обновлена')
        setLoading(false)
    }

    const deleteTodo = () => {
        dispatch(updateTodoThunk({ id, changes: { isDeleted: true } }))
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