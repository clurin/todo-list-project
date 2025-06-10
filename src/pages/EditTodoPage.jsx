import { Typography, Switch, Space, Button, Modal } from 'antd'
import { CheckOutlined, CloseOutlined, StarFilled, StarOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export const EditTodoPage = () => {
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { id } = useParams()
    const [todo, setTodo] = useState()
    const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem('todoList')))
    const [tempTitle, setTempTitle] = useState('');
    const [tempDescription, setTempDescription] = useState('');
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        if (todoList) {
            const foundTodo = todoList.todo.find((item) => item.id === id)
            setTodo(foundTodo)
        }
    }, [id, todoList])

    if (!todo) return <h1>todo нет</h1>

    const titleChange = (value) => {
        const updatedTodoList = { todo: todoList.todo.map((item) => item.id === id ? { ...item, title: value } : item) }

        setTodoList(updatedTodoList)
        localStorage.setItem('todoList', JSON.stringify(updatedTodoList))
        setTodo((item) => ({ ...item, title: value }))
    }

    const descriptionChange = (value) => {
        const updatedTodoList = { todo: todoList.todo.map((item) => item.id === id ? { ...item, description: value } : item) }

        setTodoList(updatedTodoList)
        localStorage.setItem('todoList', JSON.stringify(updatedTodoList))
        setTodo((item) => ({ ...item, description: value }))
    }

    const switchStatus = () => {
        const updatedTodoList = { todo: todoList.todo.map((item) => item.id === id ? { ...item, isActive: !item.isActive } : item) }

        setTodoList(updatedTodoList)
        localStorage.setItem('todoList', JSON.stringify(updatedTodoList))
        setTodo((item) => ({ ...item, isActive: !item.isActive }))
    }

    const switchFavorite = () => {
        const updatedTodoList = { todo: todoList.todo.map((item) => item.id === id ? { ...item, isFavorite: !item.isFavorite } : item) }

        setTodoList(updatedTodoList)
        localStorage.setItem('todoList', JSON.stringify(updatedTodoList))
        setTodo(item => ({ ...item, isFavorite: !item.isFavorite }))
    }

    const deleteTodo = () => {
        const updatedTodoList = { todo: todoList.todo.map((item) => item.id === id ? { ...item, isDeleted: true } : item) }

        setTodoList(updatedTodoList)
        localStorage.setItem('todoList', JSON.stringify(updatedTodoList))
        setTodo((item) => ({ ...item, isDeleted: true }))
        setIsModalOpen(false)
        navigate('/')
    }

    const showModal = () => {
        setIsModalOpen(true)
    }

    return (
        <div>
            <div key={todo.id} style={{ width: '50%', margin: 'auto', textAlign: 'left' }}>
                <Space direction='vertical'>
                    <Typography.Title level={3} editable={{ onChange: titleChange, maxLength: 256 }}>
                        {todo.title}
                    </Typography.Title>
                    {todo.isFavorite ? <StarFilled /> : < StarOutlined />}
                    <Typography.Paragraph editable={{ onChange: descriptionChange, maxLength: 1024 }}>
                        {todo.description}
                    </Typography.Paragraph>
                    <Space>
                        <Typography.Paragraph style={{ wordSpacing: '10px' }}>
                            Задача {todo.isActive ? 'активна' : 'выполнена'}
                            <Switch style={{ margin: '25px' }}
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                                checked={todo.isActive}
                                onChange={switchStatus}
                            />
                        </Typography.Paragraph>
                        <Typography.Paragraph style={{ wordSpacing: '10px' }}>
                            Избранная задача {todo.isFavorite ? 'да' : 'нет'}
                            <Switch style={{ margin: '25px' }}
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                                checked={todo.isFavorite}
                                onChange={switchFavorite}
                            />
                        </Typography.Paragraph>
                    </Space>
                    <Button danger onClick={showModal}>
                        Удалить задачу
                    </Button>
                    <Modal
                        title="Вы уверены, что хотите удалить эту задачу?"
                        open={isModalOpen}
                        onOk={deleteTodo}
                        onCancel={() => setIsModalOpen(false)}
                        okText="Удалить"
                        cancelText="Отмена">
                    </Modal>
                </Space>
            </div>
        </div>
    )
}