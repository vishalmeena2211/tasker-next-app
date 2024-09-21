export interface LoggedInUser {
    id: string;
    name: string;
    email: string;
};

export interface AuthState {
    user: LoggedInUser | null;
    isLoading: boolean;
    error: string | null;
    login: (credentials: { email: string; password: string }) => Promise<void>;
    logout: () => void;
    signup: (credentials: { name: string; email: string; password: string }) => Promise<void>;
}


export interface Task {
    _id: string;
    title: string;
    description?: string;
    status: 'To Do' | 'In Progress' | 'Completed' ;
    priority: 'Low' | 'Medium' | 'High';
    dueDate?: Date;
}

export interface TaskStore {
    tasks: Task[];
    isLoading: boolean;
    error: string | null;
    fetchTasks: () => Promise<void>;
    addTask: (task: Omit<Task, '_id'>) => Promise<void>;
    updateTask: (id: string, updatedTask: Partial<Task>) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
}

export interface axiosError {
    message: string;
}

export type ColumnType = {
    id: string;
    list: Task[];
}
