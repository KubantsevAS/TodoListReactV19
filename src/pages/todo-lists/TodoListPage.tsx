import {
    Suspense,
    useState,
    useMemo,
    use,
} from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { fetchTasks, Task } from '../../shared/api';
import { useParams } from 'react-router-dom';

export function TodoListPage() {
    const { userId } = useParams();
    const [paginatedTasksPromise, setTasksPromise] = useState(fetchTasks({ filters: { userId } }));

    const tasksPromise = useMemo(
        () => paginatedTasksPromise.then(res => res.data),
        [paginatedTasksPromise],
    );

    return (
        <main className='flex flex-col gap-4 container mx-auto p-4 pt-10'>
            <h1 className='text-3xl font-bold underline'>Tasks user {userId}</h1>
            <CreateTaskForm/>
            <ErrorBoundary
                fallbackRender={(error) => (
                    <div className='text-red-500'>Something went wrong{JSON.stringify(error)}</div>
                )}
            >
                <Suspense fallback={<div>Loading...</div>}>
                    <TasksList tasksPromise={tasksPromise}/>
                </Suspense>
            </ErrorBoundary>
        </main>
    );
}

export function CreateTaskForm() {
    return (
        <section>
            <form className='flex gap-2'>
                <input
                    className='border p-2 rounded'
                    name='email'
                    type='email'
                />
                <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4
                    rounded disabled:bg-gray-400'
                    type='submit'
                >
                    Add
                </button>
            </form>
        </section>
    );
}

export function TasksList({ tasksPromise }: { tasksPromise: Promise<Task[]> }) {
    const tasks = use(tasksPromise);

    return (
        <section className='flex flex-col gap-2'>
            {tasks.map((task) => <TaskCard key={task.id} task={task} />)}
        </section>
    );
}

export function TaskCard({ task }: { task: Task }) {
    return (
        <div className='flex items-center gap-2 border p-2 rounded bg-gray-100'>
            {task.title}
            <form className='ml-auto'>
                <input type='hidden' name='id' value={task.id} />
                <button
                    className='bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded disabled:bg-gray-400'>
                    Delete
                </button>
            </form>
        </div>
    );
}
