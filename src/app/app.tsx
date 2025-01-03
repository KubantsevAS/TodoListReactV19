import { Route, Routes } from 'react-router-dom';
import { UsersPage } from '../pages/users';
import { TodoListPage } from '../pages/todo-lists';

fetch('http://localhost:3001/users').then(res => console.log(res));

export function App() {
    return (
        <Routes>
            <Route path="/" element={<UsersPage />} />
            <Route path="/:userId/tasks" element={<TodoListPage />} />
        </Routes>
    );
}
