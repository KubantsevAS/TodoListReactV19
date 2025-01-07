const URI = import.meta.env.VITE_INSTANCE_URI;
const usersURL = `${URI}/users`;
const tasksURL = `${URI}/tasks`;

export type User = {
    id: string;
    email: string;
};

export function fetchUsers() {
    return fetch(usersURL).then(res => res.json() as Promise<User[]>);
}

export function createUser(user: User) {
    return fetch(usersURL, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(user),
    }).then(res => res.json());
}

export function deleteUser(userId: string) {
    return fetch(`${usersURL}/${userId}`, {
        method: 'DELETE',
    }).then(res => res.json());
}

export type Task = {
    id: string;
    userId: string;
    title: string;
    done: boolean;
    createdAt: Date;
};

export type PaginatedResponse<T> = {
    data: T[];
    first: number;
    items: number;
    last: number;
    next: string | null;
    pages: number;
    prev: string | null;
};

export function fetchTasks({
    page = 1,
    perPage = 10,
    sort = { createdAt: 'asc' },
    filters,
}: {
    page?: number;
    perPage?: number;
    sort?: { createdAt: 'asc' | 'desc' };
    filters?: { userId?: string };
}) {
    const query = new URLSearchParams({
        _page: page.toString(),
        _perPage: perPage.toString(),
        _sort: sort.createdAt === 'asc' ? 'createdAt' : '-createdAt',
        userId: filters?.userId ? filters.userId : '',
    });

    return fetch(`${tasksURL}?${query.toString()}`).then(res => res.json() as Promise<PaginatedResponse<Task>>);
}

export function createTask(task: Task) {
    return fetch(tasksURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    }).then(res => res.json());
}

export function updateTask(taskId: string, updatedTask: Partial<Task>) {
    return fetch(`${tasksURL}/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
    }).then(res => res.json());
}

export function deleteTask(taskId: string) {
    return fetch(`${tasksURL}/${taskId}`, {
        method: 'DELETE',
    }).then(res => res.json());
}

export function getTask(taskId: string) {
    return fetch(`${tasksURL}/${taskId}`, {
        method: 'GET',
    }).then(res => res.json());
}
