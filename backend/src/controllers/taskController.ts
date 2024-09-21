import { Request, Response } from 'express';
import Task from '../models/taskModel';

// Get all tasks for a specific user
export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const tasks = await Task.find({ userId: req.user.id });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Get a single task by ID for a specific user
export const getTaskById = async (req: Request, res: Response): Promise<void> => {
    try {
        const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Create a new task for a specific user
export const createTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const newTask = new Task({ ...req.body, userId: req.user.id });
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Update an existing task for a specific user
export const updateTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedTask = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            req.body,
            { new: true }
        );
        if (!updatedTask) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Delete a task for a specific user
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedTask = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!deletedTask) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};