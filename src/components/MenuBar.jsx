import { Segmented } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

export const MenuBar = () => {
    const navigate = useNavigate()
    const location = useLocation();

    let current = 'Главная';
    if (location.pathname === ROUTES.FAVORITES) current = 'Избранные';
    else if (location.pathname === ROUTES.COMPLETED) current = 'Выполненные';
    else if (location.pathname === ROUTES.DELETED) current = 'Удалённые';
    return (
        <div>
            <Segmented options={['Главная', 'Избранные', 'Выполненные', 'Удалённые']}
                value={current}
                onChange={(value) => {
                    switch (value) {
                        case 'Главная':
                            current = `${ROUTES.HOME}`
                            return navigate(ROUTES.HOME)
                        case 'Избранные':
                            current = `${ROUTES.FAVORITES}`
                            return navigate(ROUTES.FAVORITES)
                        case 'Выполненные':
                            return navigate(ROUTES.COMPLETED)
                        case 'Удалённые':
                            return navigate(ROUTES.DELETED)
                        default:
                            return navigate(ROUTES.HOME) 
                    }
                }}
            />
        </div>
    )
}