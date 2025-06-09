import { Typography, Space, Divider, Button } from 'antd'
import { EditFilled, StarFilled, StarOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import { getTodoList } from '../storage/storage'

export const ListTodo = ({ value }) => {
    let todoList = getTodoList().todo

    if (value === 'MainPage') {
        todoList = todoList.filter((item) => !item.isDeleted)
    } else if (value === 'FavoriteTodoPage') {
        todoList = todoList.filter((item) => !item.isDeleted && item.isFavorite)
    } else if (value === 'DeletedTodoPage') {
        todoList = todoList.filter((item) => item.isDeleted)
    } else if (value === 'CompletedTodoPage') {
        todoList = todoList.filter((item) => !item.isActive && !item.isDeleted)
    }

    return (
        <div>
            {todoList?.map(item => (
                <div key={item.id} style={{ width: '50%', margin: 'auto', textAlign: 'left' }}>
                    <Space direction='vertical'>
                        <Typography.Title level={3}>
                            {item.title}

                            {
                                !item.isDeleted && (
                                    <Link style={{ margin: `20px` }} to={`${ROUTES.EDIT}/${item.id}`}>
                                        <Button
                                            type="primary"
                                            icon={<EditFilled />}
                                            shape="circle"
                                        />
                                    </Link>
                                )
                            }

                            {!item.isDeleted && (item.isFavorite ? <StarFilled /> : <StarOutlined />)}

                        </Typography.Title>
                        <Typography.Paragraph ellipsis={{ rows: 2 }}>
                            {item.description}
                        </Typography.Paragraph>
                        <Typography.Paragraph>
                            Задача {item.isActive ? 'активна' : 'выполнена'}
                        </Typography.Paragraph>
                        <Typography.Paragraph>
                            Создана: {item.createdAt}
                        </Typography.Paragraph>
                        <Divider style={{ borderColor: '#000' }} variant='solid' orientation='right' />
                    </Space>
                </div>
            ))}
        </div>
    )
}
