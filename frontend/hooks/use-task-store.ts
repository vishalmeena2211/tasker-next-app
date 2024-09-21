import { create } from 'zustand';
import axios from 'axios';

const BASE_URL = "http://localhost:5000/api/v1/";

interface Task {
    _id: string;
    title: string;
    description?: string;
    status: 'To Do' | 'In Progress' | 'Completed';
    priority: 'Low' | 'Medium' | 'High';
    dueDate?: Date;
}

interface TaskStore {
    tasks: Task[];
    isLoading: boolean;
    error: string | null;
    fetchTasks: () => Promise<void>;
    addTask: (task: Omit<Task, '_id'>) => Promise<void>;
    updateTask: (id: string, updatedTask: Partial<Task>) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set) => ({
    tasks: [],
    isLoading: false,
    error: null,

    fetchTasks: async () => {
        set({ isLoading: true });
        try {
            const response = await axios.get(BASE_URL + 'tasks', { withCredentials: true });
            set({ tasks: response.data, isLoading: false });
        } catch (error) {
            set({ error: (error as Error).message, isLoading: false });
        }
    },

    addTask: async (task) => {
        set({ isLoading: true });
        try {
            const response = await axios.post(BASE_URL + 'tasks', task, { withCredentials: true });
            set((state) => ({
                tasks: [...state.tasks, response.data],
                isLoading: false,
            }));
        } catch (error) {
            set({ error: (error as Error).message, isLoading: false });
        }
    },

    updateTask: async (id, updatedTask) => {
        set({ isLoading: true });
        try {
            const response = await axios.put(BASE_URL + `tasks/${id}`, updatedTask, { withCredentials: true });
            set((state) => ({
                tasks: state.tasks.map((task) =>
                    task._id === id ? response.data : task
                ),
                isLoading: false,
            }));
        } catch (error) {
            set({ error: (error as Error).message, isLoading: false });
        }
    },

    deleteTask: async (id) => {
        set({ isLoading: true });
        try {
            await axios.delete(BASE_URL + `tasks/${id}`, { withCredentials: true });
            set((state) => ({
                tasks: state.tasks.filter((task) => task._id !== id),
                isLoading: false,
            }));
        } catch (error) {
            set({ error: (error as Error).message, isLoading: false });
        }
    },
}));

// Fetch tasks when the store is initialized
useTaskStore.getState().fetchTasks();
