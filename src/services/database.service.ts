import Dexie, { Table } from 'dexie'
import { Task, Category, TaskCategory } from '../models/business/task.model'

export class TaskDatabase extends Dexie {
	tasks!: Table<Task>
	categories!: Table<Category>
	tasks_categories!: Table<TaskCategory>

	constructor() {
		super('TaskDatabase')

		this.version(1).stores({
			tasks: '++id, title, description',
			categories: '++id, title, color',
			tasks_categories: '[task_id+category_id], task_id, category_id',
		})
	}
}

// Instancia única de la base de datos
const db = new TaskDatabase()

export default db
