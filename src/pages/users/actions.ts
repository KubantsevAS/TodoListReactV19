import { createUser, deleteUser, User } from '../../shared/api';

type CreateUserActionState = {
    error?: string;
    email?: string;
};

export type CreateUserAction = (
    state: CreateUserActionState,
    formData: FormData,
) => Promise<CreateUserActionState>;

export const createUserAction = ({
    refetchUsers,
    optimisticCreate,
}: {
    refetchUsers: () => void;
    optimisticCreate: (user: User) => void;
}): CreateUserAction => (
    async (_, formData) => {
        const email = formData.get('email') as string;

        if (!email) {
            return {};
        }

        if (email === 'admin@gmail.com') {
            return { error: 'Admin account id not allowed', email };
        }

        try {
            const user = {
                email,
                id: crypto.randomUUID(),
            };
            optimisticCreate(user);
            await createUser(user);
            refetchUsers();

            return {};
        } catch {
            return { error: 'Error while creating user', email };
        }
    }
);

type DeleteUserActionState = {
    error?: string;
    selectedUserId?: string;
};

export type DeleteUserAction = (
    state: DeleteUserActionState,
    formData: FormData,
) => Promise<DeleteUserActionState>;

export const deleteUserAction = ({
    refetchUsers,
    optimisticDelete,
}: {
    refetchUsers: () => void;
    optimisticDelete: (id: string) => void;
}): DeleteUserAction => (
    async (_, formData) => {
        const selectedUserId = formData.get('id') as string;

        try {
            optimisticDelete(selectedUserId);
            await deleteUser(selectedUserId);
            refetchUsers();

            return {};
        } catch {
            return { error: 'Error while deleting user' };
        }
    }
);
