import { createTask, deleteTask } from '../../shared/api';

type CreateTaskActionState = {
    error?: string;
    title?: string;
};

export type CreateTaskAction = (
    state: CreateTaskActionState,
    formData: FormData,
) => Promise<CreateTaskActionState>;

export const createTaskAction = ({
    refetchTasks,
    userId,
}: {
    refetchTasks: () => void;
    userId: string;
}): CreateTaskAction => (
    async (_, formData) => {
        const title = formData.get('title') as string;

        try {
            const task = {
                title,
                userId,
                id: crypto.randomUUID(),
                createdAt: new Date(),
                done: false,
            };
            await createTask(task);
            refetchTasks();

            return { title: '' };
        } catch {
            return { error: 'Error while creating task', title };
        }
    }
);

type DeleteTaskActionState = {
    error?: string;
    selectedTaskId?: string;
};

export type DeleteTaskAction = (
    state: DeleteTaskActionState,
    formData: FormData,
) => Promise<DeleteTaskActionState>;

export const deleteTaskAction = ({
    refetchTasks,
}: {
    refetchTasks: () => void;
}): DeleteTaskAction => (
    async (_, formData) => {
        const selectedTaskId = formData.get('id') as string;

        try {
            await deleteTask(selectedTaskId);
            refetchTasks();

            return {};
        } catch {
            return { error: 'Error while deleting task' };
        }
    }
);
