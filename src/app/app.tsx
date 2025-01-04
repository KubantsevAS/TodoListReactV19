import { Route, Routes } from 'react-router-dom';
import { UsersPage } from '../pages/users';
import { TodoListPage } from '../pages/todo-lists';

export function App() {
    return (
        <Routes>
            <Route path='/' element={<UsersPage />} />
            <Route path='/:userId/tasks' element={<TodoListPage />} />
        </Routes>
    );
}
