import { useState } from 'react';

type User = {
    id: string;
    email: string;
};

export function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [email, setEmail] = useState<string>('');

    const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setUsers([...users, { id: crypto.randomUUID(), email }]);
        setEmail('');
    };
    const deleteUser = (selectedUserId:string) => {
        setUsers(users.filter(user => user.id !== selectedUserId));
    };

    return (
        <main className='flex flex-col gap-4 container mx-auto p-4 pt-10'>
            <h1 className="text-3xl font-bold underline">Users</h1>
            <section>
                <form className="flex gap-2" onSubmit={handleSubmit}>
                    <input
                        className="border p-2 rounded"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        type="submit"
                    >
                        Add
                    </button>
                </form>
            </section>
            <section className="flex flex-col gap-2">
                {users.map((user) => (
                    <div className="flex items-center gap-2 border p-2 rounded bg-gray-100" key={user.id}>
                        {user.email}
                        <button
                            className='bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded ml-auto'
                            type='button'
                            onClick={() => deleteUser(user.id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </section>
        </main>
    );
}
