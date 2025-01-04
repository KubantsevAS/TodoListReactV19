const URI = import.meta.env.VITE_INSTANCE_URI;

export type User = {
    id: string;
    email: string;
};

export function fetchUsers() {
    return fetch(URI).then(res => res.json() as Promise<User[]>);
}

export function createUser(user: User) {
    return fetch(URI, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(user),
    }).then(res => res.json());
}

export function deleteUser(userId: string) {
    return fetch(`${URI}/${userId}`, {
        method: 'DELETE',
    }).then(res => res.json());
}
