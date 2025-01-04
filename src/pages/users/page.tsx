import { Suspense, use, useState } from 'react';
import { createUser, deleteUser, fetchUsers, User } from '../../shared/api';

const defaultUsersPromise = fetchUsers();

export function UsersPage() {
    const [usersPromise, setUsersPromise] = useState(defaultUsersPromise);
    const refetchUsers = () => setUsersPromise(fetchUsers());

    return (
        <main className='flex flex-col gap-4 container mx-auto p-4 pt-10'>
            <h1 className='text-3xl font-bold underline'>Users</h1>
            <AddUserForm refetchUsers={refetchUsers} />
            <Suspense fallback={<div>Loading...</div>}>
                <UsersList usersPromise={usersPromise} />
            </Suspense>
        </main>
    );
}

export function AddUserForm({ refetchUsers } : { refetchUsers: () => void}) {
    const [email, setEmail] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await createUser({
            email,
            id: crypto.randomUUID(),
        });
        refetchUsers();
        setEmail('');
    };

    return (
        <section>
            <form className='flex gap-2' onSubmit={handleSubmit}>
                <input
                    className='border p-2 rounded'
                    type='email'
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    type='submit'
                >
                    Add
                </button>
            </form>
        </section>
    );
}

export function UsersList({ usersPromise }: { usersPromise:Promise<User[]> }) {
    const users = use(usersPromise);

    return (
        <section className='flex flex-col gap-2'>
            {users.map((user) => <UserCard key={user.id} user={user} />)}
        </section>
    );
}

export function UserCard({ user } : { user:User }) {
    const deleteUserOnClick = (selectedUserId:string) => {
        deleteUser(selectedUserId);
    };

    return (
        <div className='flex items-center gap-2 border p-2 rounded bg-gray-100' key={user.id}>
            {user.email}
            <button
                className='bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded ml-auto'
                type='button'
                onClick={() => deleteUserOnClick(user.id)}
            >
                Delete
            </button>
        </div>
    );
}
