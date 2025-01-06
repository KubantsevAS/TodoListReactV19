import { createUser } from '../../shared/api';

type CreateActionState = {
    error?: string;
};

export const createUserAction = (
    {
        refetchUsers,
        setEmail,
    }: {
        refetchUsers: () => void;
        setEmail: (email: string) => void;
    },
) => (
    async (
        prevState: CreateActionState,
        formData: { email: string },
    ): Promise<CreateActionState> => {
        try {
            await createUser({
                email: formData.email,
                id: crypto.randomUUID(),
            });
            refetchUsers();
            setEmail('');

            return {};
        } catch {
            return {
                error: 'Error while creating user',
            };
        }
    }
);
