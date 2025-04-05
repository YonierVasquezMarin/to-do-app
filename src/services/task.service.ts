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
	 * @returns Promise<Task[]> Lista de tareas
	 */
	public async getTasks(): Promise<Task[]> {
		try {
			return await db.tasks.toArray()
		} catch (error) {
			console.error('Error obteniendo las tareas:', error)
			return []
		}
	}
}
