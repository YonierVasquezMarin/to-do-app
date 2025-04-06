import { Injectable } from '@angular/core'
import db from './database.service'
import { Task } from '../models/business/task.model'

@Injectable({
	providedIn: 'root',
})
export class TaskService {
	constructor() {}

	/**
	 * Fetches all tasks from the database
	 * @returns Promise<Task[]> List of tasks
	 */
	public async getTasks(): Promise<Task[]> {
		try {
			return await db.tasks.toArray()
		} catch (error) {
			console.error('Error getting tasks:', error)
			return []
		}
	}

	/**
	 * Gets a specific task by its ID
	 * @param id ID of the task to find
	 * @returns Promise<Task | undefined> Found task or undefined if it doesn't exist
	 */
	public async getTaskById(id: number): Promise<Task | undefined> {
		try {
			return await db.tasks.get(id)
		} catch (error) {
			console.error('Error getting task:', error)
			return undefined
		}
	}

	/**
	 * Creates a new task in the database
	 * @param task Task to create
	 * @returns Promise<number> ID of the created task
	 */
	public async createTask(task: Omit<Task, 'id'>): Promise<number> {
		try {
			return await db.tasks.add(task)
		} catch (error) {
			console.error('Error creating task:', error)
			throw error
		}
	}

	/**
	 * Deletes a task from the database
	 * @param id ID of the task to delete
	 * @returns Promise<void>
	 */
	public async deleteTask(id: number): Promise<void> {
		try {
			await db.tasks.delete(id)
		} catch (error) {
			console.error('Error deleting task:', error)
			throw error
		}
	}
}
