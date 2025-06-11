import { Segmented } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '../constants/routes'

export const MenuBar = () => {
    const navigate = useNavigate()
    const location = useLocation()

    let current

    switch (location.pathname) {
        case ROUTES.HOME:
            current = 'Главная'
            break
        case ROUTES.FAVORITES:
            current = 'Избранные'
            break
        case ROUTES.COMPLETED:
            current = 'Выполненные'
            break
        case ROUTES.DELETED:
            current = 'Удалённые'
            break
        default:
            current = undefined
    }
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