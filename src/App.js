import { Route, Routes } from 'react-router-dom';
import './App.css';
import { MenuBar } from './components/MenuBar';
import { MainPage } from './pages/MainPage';
import { FavoriteTodoPage } from './pages/FavoriteTodoPage';
import { CompletedTodoPage } from './pages/CompletedTodoPage';
import { DeletedTodoPage } from './pages/DeletedTodoPage';
import { ROUTES } from './constants/routes';
import { Divider } from 'antd';
import { EditTodoPage } from './pages/EditTodoPage';

export const App = () => {
  return (
    <div className="App">
      <MenuBar />
      <Divider style={{ borderColor: '#000' }} variant='solid' />
      <Routes>
        <Route path={ROUTES.HOME} element={<MainPage />} />
        <Route path={ROUTES.FAVORITES} element={<FavoriteTodoPage />} />
        <Route path={ROUTES.COMPLETED} element={<CompletedTodoPage />} />
        <Route path={ROUTES.DELETED} element={<DeletedTodoPage />} />
        <Route path={`${ROUTES.EDIT}/:id`} element={<EditTodoPage />} />
      </Routes>
    </div>
  )
}