import { EditFilled, StarFilled, StarOutlined } from '@ant-design/icons'
import { Button, Space, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getTodoList } from '../../storage/storage'
import { ROUTES } from '../../constants/routes'
import styles from './DetailTodoPage.module.css'

export const DetailTodoPage = () => {
    const { id } = useParams()
    const [todo, setTodo] = useState()
    const [todoList] = useState(getTodoList())

    useEffect(() => {
        if (todoList) {
            const foundTodo = todoList.find((item) => item.id === id)
            setTodo(foundTodo)
        }
    }, [id, todoList])

    if (!todo) return <h1>todo нет</h1>

    return (
        <div>
            <div key={todo.id} className={styles.container}>
                <Space direction="vertical">
                    <Typography.Title level={3}>
                        {todo.title}
                        {!todo.isDeleted && (
                            <Link
                                to={`${ROUTES.EDIT}/${todo.id}`}
                                className={styles.editLink}
                            >
                                <Button
                                    type="primary"
                                    icon={<EditFilled />}
                                    shape="circle"
                                />
                            </Link>
                        )}
                    </Typography.Title>
                    {todo.isFavorite ? <StarFilled /> : <StarOutlined />}
                    <Typography.Paragraph>
                        {todo.description}
                    </Typography.Paragraph>
                    <Space>
                        <Typography.Paragraph className={styles.paragraphSpacing}>
                            Задача {todo.isActive ? 'активна' : 'выполнена'}
                        </Typography.Paragraph>
                        <Typography.Paragraph className={styles.paragraphSpacing}>
                            Избранная задача {todo.isFavorite ? 'да' : 'нет'}
                        </Typography.Paragraph>
                    </Space>
                </Space>
            </div>
        </div>
    )
}