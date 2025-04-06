import Dexie, { Table } from 'dexie'
import { Task, Category, State } from '../models/business/task.model'

export class TaskDatabase extends Dexie {
	tasks!: Table<Task>
	categories!: Table<Category>
	states!: Table<State>

	constructor() {
		super('TaskDatabase')

		this.version(3).stores({
			tasks: '++id, title, description, state_id, *categories',
			categories: '++id, name, color',
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
