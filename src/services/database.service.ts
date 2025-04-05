import Dexie, { Table } from 'dexie'

interface Task {
	id?: number
	title: string
	description: string
}

interface Category {
	id?: number
	title: string
	color: string
}

interface TaskCategory {
	task_id: number
	category_id: number
}

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
