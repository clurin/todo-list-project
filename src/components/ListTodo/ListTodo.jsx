import { Typography, Space, Button, Switch, Flex } from 'antd'
import { EditFilled, StarFilled, StarOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import { useDispatch, useSelector } from 'react-redux'
import { updateListTodoSlice } from '../../store/listTodoSlice'
import { updateTodoList } from '../../storage/storage'
import { useState } from 'react'
import styles from './ListTodo.module.css'

export const ListTodo = ({ value }) => {
    const todos = useSelector((state) => state.listTodoSlice.listTodo)
    const dispatch = useDispatch()
    const [sortDescending, setSortDescending] = useState(true)

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

    filteredTodos = [...filteredTodos].sort((a, b) => sortDescending ? b.createdAt - a.createdAt : a.createdAt - b.createdAt)
    const switchSortType = () => setSortDescending((item) => !item)

    const switchFavorite = (id) => {
        const updatedTodos = todos.map((item) => item.id === id ? { ...item, isFavorite: !item.isFavorite } : item)

        dispatch(updateListTodoSlice(updatedTodos))
        updateTodoList(updatedTodos)
    }

    return (
        <div>
            <Switch
                onChange={switchSortType}
                checked={sortDescending}
                checkedChildren="по убыванию"
                unCheckedChildren="по возрастанию"
            />
            {filteredTodos.map((item) => (
                <div key={item.id} className={styles.todoContainer}>
                    <Space direction="vertical">
                        <Flex justify="start" align="center">
                            <Link to={`${ROUTES.DETAIL}/${item.id}`}>
                                <Typography.Title level={3}>
                                    {item.title}
                                </Typography.Title>
                            </Link>
                            {!item.isDeleted && (
                                <Link
                                    to={`${ROUTES.EDIT}/${item.id}`}
                                    className={styles.editLink}
                                >
                                    <Button
                                        type="primary"
                                        icon={<EditFilled />}
                                        shape="circle"
                                    />
                                </Link>
                            )}
                            {!item.isDeleted && (
                                <Button
                                    type="text"
                                    icon={
                                        item.isFavorite ? <StarFilled /> : <StarOutlined />
                                    }
                                    onClick={() => switchFavorite(item.id)}
                                />
                            )}
                        </Flex>
                        <Link to={`${ROUTES.DETAIL}/${item.id}`}>
                            <Typography.Paragraph ellipsis={{ rows: 2 }}>
                                {item.description}
                            </Typography.Paragraph>
                        </Link>
                        <Typography.Paragraph>
                            Задача {item.isActive ? 'активна' : 'выполнена'}
                        </Typography.Paragraph>
                        <Typography.Paragraph>
                            Создана:{' '}
                            {Intl.DateTimeFormat('ru').format(item.createdAt)}
                        </Typography.Paragraph>
                    </Space>
                    <hr className={styles.divider} />
                </div>
            ))}
        </div>
    )
}
