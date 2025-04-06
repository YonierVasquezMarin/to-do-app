import Dexie, { Table } from 'dexie'
import { Task, Category, TaskCategory, State } from '../models/business/task.model'

export class TaskDatabase extends Dexie {
	tasks!: Table<Task>
	categories!: Table<Category>
	tasks_categories!: Table<TaskCategory>
	states!: Table<State>

	constructor() {
		super('TaskDatabase')

		this.version(2).stores({
			tasks: '++id, title, description, state_id',
			categories: '++id, title, color',
			tasks_categories: '[task_id+category_id], task_id, category_id',
			states: '++id, name',
		})

		// Poblar estados iniciales
		this.on('populate', async () => {
			await this.states.bulkAdd([{ name: 'pendiente' }, { name: 'completada' }])
		})
	}
}

// Instancia única de la base de datos
const db = new TaskDatabase()

export default db
