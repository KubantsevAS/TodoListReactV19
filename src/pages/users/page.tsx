import { useActionState, Suspense } from 'react';
import { User } from '../../shared/api';
import { ErrorBoundary } from 'react-error-boundary';
import { CreateUserAction, DeleteUserAction } from './actions';
import { useUsers } from './useUsers';

export function UsersPage() {
    const { useUsersList, createUserAction, deleteUserAction } = useUsers();

    return (
        <main className='flex flex-col gap-4 container mx-auto p-4 pt-10'>
            <h1 className='text-3xl font-bold underline'>Users</h1>
            <CreateUserForm createUserAction={createUserAction}/>
            <ErrorBoundary
                fallbackRender={(error) => (
                    <div className='text-red-500'>Something went wrong{JSON.stringify(error)}</div>
                )}
            >
                <Suspense fallback={<div>Loading...</div>}>
                    <UsersList useUsersList={useUsersList} deleteUserAction={deleteUserAction}/>
                </Suspense>
            </ErrorBoundary>
        </main>
    );
}

export function CreateUserForm({ createUserAction }: { createUserAction: CreateUserAction }) {
    const [state, dispatch, isPending] = useActionState(createUserAction, { email: '' });

    return (
        <section>
            <form className='flex gap-2' action={dispatch}>
                <input
                    className='border p-2 rounded'
                    name='email'
                    type='email'
                    defaultValue={state.email}
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
    useUsersList: () => User[];
    deleteUserAction: DeleteUserAction;
}

export function UsersList({ useUsersList, deleteUserAction }: IUsersList) {
    const users = useUsersList();

    return (
        <section className='flex flex-col gap-2'>
            {users.map((user) => <UserCard key={user.id} user={user} deleteUserAction={deleteUserAction} />)}
        </section>
    );
}

export function UserCard(
    { user, deleteUserAction }: { user: User; deleteUserAction: DeleteUserAction },
) {
    const [state, dispatch, isPending] = useActionState(deleteUserAction, {});

    return (
        <div className='flex items-center gap-2 border p-2 rounded bg-gray-100'>
            {user.email}
            <form className='ml-auto' action={dispatch}>
                <input type='hidden' name='id' value={user.id} />
                <button
                    className='bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded disabled:bg-gray-400'
                    disabled={isPending}
                >
                    Delete
                </button>
            </form>
            {state.error && <div className='text-red-500'>{state.error}</div>}
        </div>
    );
}
