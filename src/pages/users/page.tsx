import {
    use,
    useActionState,
    useState,
    useTransition,
    startTransition,
    Suspense,
} from 'react';
import {
    deleteUser, fetchUsers, User,
} from '../../shared/api';
import { ErrorBoundary } from 'react-error-boundary';
import { createUserAction } from './actions';

const defaultUsersPromise = fetchUsers();

export function UsersPage() {
    const [usersPromise, setUsersPromise] = useState(defaultUsersPromise);
    const refetchUsers = () => setUsersPromise(fetchUsers());

    return (
        <main className='flex flex-col gap-4 container mx-auto p-4 pt-10'>
            <h1 className='text-3xl font-bold underline'>Users</h1>
            <AddUserForm refetchUsers={refetchUsers} />
            <ErrorBoundary
                fallbackRender={(error) => (
                    <div className='text-red-500'>Something went wrong{JSON.stringify(error)}</div>
                )}
            >
                <Suspense fallback={<div>Loading...</div>}>
                    <UsersList usersPromise={usersPromise} refetchUsers={refetchUsers} />
                </Suspense>
            </ErrorBoundary>
        </main>
    );
}

export function AddUserForm({ refetchUsers }: { refetchUsers: () => void }) {
    const [email, setEmail] = useState('');
    const [state, dispatch, isPending] = useActionState(createUserAction({ refetchUsers, setEmail }), {});

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        startTransition(async () => {
            dispatch({ email });
        });
    };

    return (
        <section>
            <form className='flex gap-2' onSubmit={handleSubmit}>
                <input
                    className='border p-2 rounded'
                    type='email'
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    disabled={isPending}
                />
                <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4
                    rounded disabled:bg-gray-400'
                    type='submit'
                    disabled={isPending}
                >
                    Add
                </button>
                {state.error && <div className='text-red-500'>{state.error}</div>}
            </form>
        </section>
    );
}

interface IUsersList {
    usersPromise: Promise<User[]>;
    refetchUsers: () => void;
}

export function UsersList({ usersPromise, refetchUsers }: IUsersList) {
    const users = use(usersPromise);

    return (
        <section className='flex flex-col gap-2'>
            {users.map((user) => <UserCard key={user.id} user={user} refetchUsers={refetchUsers}/>)}
        </section>
    );
}

interface IUserCard {
    user: User;
    refetchUsers: () => void;
}

export function UserCard({ user, refetchUsers }: IUserCard) {
    const [isPending, startTransition] = useTransition();
    const handleDelete = (selectedUserId: string) => {
        startTransition(async () => {
            await deleteUser(selectedUserId);
            startTransition(() => refetchUsers());
        });
    };

    return (
        <div className='flex items-center gap-2 border p-2 rounded bg-gray-100' key={user.id}>
            {user.email}
            <button
                className='bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded ml-auto disabled:bg-gray-400'
                type='button'
                onClick={() => handleDelete(user.id)}
                disabled={isPending}
            >
                Delete
            </button>
        </div>
    );
}
