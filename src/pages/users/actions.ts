import { createUser, deleteUser } from '../../shared/api';

type CreateUserActionState = {
    error?: string;
    email?: string;
};

export const createUserAction = ({ refetchUsers }: { refetchUsers: () => void }) => (
    async (
        _: CreateUserActionState,
        formData: FormData,
    ): Promise<CreateUserActionState> => {
        const email = formData.get('email') as string;

        if (!email) {
            return {};
        }

        if (email === 'admin@gmail.com') {
            return { error: 'Admin account id not allowed', email };
        }

        try {
            await createUser({
                email,
                id: crypto.randomUUID(),
            });

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

export const deleteUserAction =
    ({ refetchUsers, selectedUserId }: { refetchUsers: () => void; selectedUserId: string }) => (
        async (): Promise<DeleteUserActionState> => {
            try {
                await deleteUser(selectedUserId);

                refetchUsers();

                return {};
            } catch {
                return { error: 'Error while deleting user' };
            }
        }
    );
