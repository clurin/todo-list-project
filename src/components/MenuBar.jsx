import { Button, Flex } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

export const MenuBar = () => {
    return (
        <div>
            <Flex justify='center' gap={10}>
                <Button type='text'>
                    <Link to={ROUTES.HOME}>Главная</Link>
                </Button>
                <Button type='text'>
                    <Link to={ROUTES.FAVORITES}>Избранные</Link>
                </Button>
                <Button type='text'>
                    <Link to={ROUTES.COMPLETED}>Выполненные</Link>
                </Button>
                <Button type='text'>
                    <Link to={ROUTES.DELETED}>Удалённые</Link>
                </Button>
            </Flex>
        </div>
    )
}