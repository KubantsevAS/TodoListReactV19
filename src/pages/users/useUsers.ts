import { startTransition, useState } from 'react';
import { fetchUsers } from '../../shared/api';

export function useUsers() {
    const defaultUsersPromise = fetchUsers();
    const [usersPromise, setUsersPromise] = useState(defaultUsersPromise);
    const refetchUsers = () => startTransition(() => setUsersPromise(fetchUsers()));

    return [usersPromise, refetchUsers] as const;
}
