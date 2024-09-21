"use client";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ReusableTable } from "@/components/comman/ReusableTable";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { useTaskStore } from "@/hooks/use-task-store";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Task } from "@/lib/types";

export default function Dashboard() {
    const { tasks, addTask, updateTask, deleteTask } = useTaskStore();
    const [newTask, setNewTask] = useState<Partial<Task>>({});
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleCreate = useCallback(() => {
        if (!newTask.title || !newTask.description || !newTask.dueDate || !newTask.status || !newTask.priority) {
            alert("Please fill all fields");
            return;
        }
        addTask(newTask as Task);
        setNewTask({});
        setIsDialogOpen(false);
    }, [newTask, addTask]);

    const handleUpdate = useCallback(() => {
        if (editingTask) {
            updateTask(editingTask._id, editingTask);
            setEditingTask(null);
            setIsDialogOpen(false);
        }
    }, [editingTask, updateTask]);

    const handleDelete = useCallback((id: string) => {
        deleteTask(id);
    }, [deleteTask]);

    const handleEdit = useCallback((task: Task) => {
        setEditingTask(task);
        setIsDialogOpen(true);
    }, []);

    const columns: ColumnDef<Task>[] = [
        {
            accessorKey: "title",
            header: "Task Name",
        },
        {
            accessorKey: "description",
            header: "Task Description",
        },
        {
            accessorKey: "dueDate",
            header: "Due Date",
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ getValue }) => {
                const status = getValue() as string;
                return (
                    <span
                        className={`px-4 py-1 rounded ${status === "Completed"
                            ? "bg-green-500"
                            : status === "In Progress"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                    >
                        {status}
                    </span>
                );
            },
        },
        {
            accessorKey: "priority",
            header: "Priority",
            cell: ({ getValue }) => {
                const priority = getValue() as string;
                return (
                    <span
                        className={`px-4 py-1 rounded ${priority === "High"
                            ? "bg-red-500"
                            : priority === "Medium"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            }`}
                    >
                        {priority}
                    </span>
                );
            },
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex space-x-2">
                    <Button
                        onClick={() => handleEdit(row.original)}
                    >
                        Edit
                    </Button>
                    <Button
                        onClick={() => handleDelete(row.original._id)}
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className='mx-auto max-w-7xl'>
            <motion.header
                className='flex justify-between items-center mb-8'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className='font-bold text-3xl text-gray-900 dark:text-gray-100'>
                    Task Dashboard
                </h1>
            </motion.header>

            <h3 className='font-semibold text-gray-900 text-xl dark:text-gray-100'>
                Recent Tasks
            </h3>
            <ReusableTable data={tasks} columns={columns} />

            <Dialog open={isDialogOpen} onOpenChange={(open) => {
                setIsDialogOpen(open);
                if (!open) setEditingTask(null);
            }}>
                <DialogTrigger asChild>
                    <Button className="mt-8">Create New Task</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>{editingTask ? "Edit Task" : "Create New Task"}</DialogTitle>
                    <DialogDescription>

                        <div className="space-y-4">
                            <Input
                                type="text"
                                placeholder="Task Name"
                                value={editingTask ? editingTask.title : newTask.title || ""}
                                onChange={(e) => editingTask ? setEditingTask({ ...editingTask, title: e.target.value }) : setNewTask({ ...newTask, title: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                            <Input
                                type="text"
                                placeholder="Task Description"
                                value={editingTask ? editingTask.description : newTask.description || ""}
                                onChange={(e) => editingTask ? setEditingTask({ ...editingTask, description: e.target.value }) : setNewTask({ ...newTask, description: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                            <Input
                                type="date"
                                placeholder="Due Date"
                                value={editingTask ? editingTask.dueDate?.toString() : newTask.dueDate?.toString() || ""}
                                onChange={(e) => editingTask ? setEditingTask({ ...editingTask, dueDate: new Date(e.target.value) }) : setNewTask({ ...newTask, dueDate: new Date(e.target.value) })}
                                className="w-full p-2 border rounded"
                            />
                            <Select
                                value={editingTask ? editingTask.status : newTask.status || ""}
                                onValueChange={(value) => editingTask ? setEditingTask({ ...editingTask, status: value }) : setNewTask({ ...newTask, status: value })}
                            >
                                <SelectTrigger className="w-full p-2 border rounded">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="To Do">To Do</SelectItem>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select
                                value={editingTask ? editingTask.priority : newTask.priority || ""}
                                onValueChange={(value) => editingTask ? setEditingTask({ ...editingTask, priority: value }) : setNewTask({ ...newTask, priority: value })}
                            >
                                <SelectTrigger className="w-full p-2 border rounded">
                                    <SelectValue placeholder="Priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Low">Low</SelectItem>
                                    <SelectItem value="Medium">Medium</SelectItem>
                                    <SelectItem value="High">High</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </DialogDescription>
                    <DialogClose asChild>
                        <Button
                            onClick={editingTask ? handleUpdate : handleCreate}
                            className="px-4 py-2 rounded"
                        >
                            {editingTask ? "Update Task" : "Create Task"}
                        </Button>
                    </DialogClose>
                </DialogContent>
            </Dialog>
        </div>
    );
}
