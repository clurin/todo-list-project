import { Typography, Space, Button } from 'antd'
import { EditFilled, StarFilled, StarOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import { useDispatch, useSelector } from 'react-redux'
import { updateListTodoSlice } from '../store/listTodoSlice'
import { updateTodoList } from '../storage/storage'

export const ListTodo = ({ value }) => {
    const todos = useSelector((state) => state.listTodoSlice.listTodo)
    const dispatch = useDispatch()

    let filteredTodos
    switch (value) {
        case 'MainPage':
            filteredTodos = todos.filter((item) => !item.isDeleted)
            break
        case 'FavoriteTodoPage':
            filteredTodos = todos.filter((item) => !item.isDeleted && item.isFavorite)
            break
        case 'DeletedTodoPage':
            filteredTodos = todos.filter((item) => item.isDeleted)
            break
        case 'CompletedTodoPage':
            filteredTodos = todos.filter((item) => !item.isActive && !item.isDeleted)
            break
        default:
            filteredTodos = todos
    }
    filteredTodos = filteredTodos.sort((a, b) => b.createdAt - a.createdAt);

    const toggleFavorite = (id) => {
        const updatedTodos = todos.map((item) => item.id === id ? { ...item, isFavorite: !item.isFavorite } : item)

        dispatch(updateListTodoSlice(updatedTodos))
        updateTodoList(updatedTodos)
    }

    return (
        <div>
            {filteredTodos.map((item) => (
                <div key={item.id} style={{ width: '50%', margin: 'auto', textAlign: 'left' }}>
                    <Space direction='vertical'>
                        <Typography.Title level={3}>
                            {item.title}
                            {!item.isDeleted && (
                                <Link style={{ margin: `20px` }} to={`${ROUTES.EDIT}/${item.id}`}>
                                    <Button
                                        type="primary"
                                        icon={<EditFilled />}
                                        shape="circle" />
                                </Link>
                            )}
                            {!item.isDeleted && (
                                <Button
                                    type="text"
                                    icon={item.isFavorite ? <StarFilled /> : <StarOutlined />}
                                    onClick={() => toggleFavorite(item.id)} />
                            )}
                        </Typography.Title>
                        <Typography.Paragraph ellipsis={{ rows: 2 }}>
                            {item.description}
                        </Typography.Paragraph>
                        <Typography.Paragraph>
                            Задача {item.isActive ? 'активна' : 'выполнена'}
                        </Typography.Paragraph>
                        <Typography.Paragraph>
                            Создана: {Intl.DateTimeFormat('ru').format(item.createdAt)}
                        </Typography.Paragraph>
                    </Space>
                    <hr style={{ width: '100%' }} />
                </div>
            ))}
        </div>
    )
}
