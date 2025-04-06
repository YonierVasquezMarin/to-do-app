export interface State {
	id?: number
	name: string
}

export interface Task {
	id?: number
	title: string
	description: string
	state_id: number
}

export interface Category {
	id?: number
	title: string
	color: string
}

export interface TaskCategory {
	task_id: number
	category_id: number
}
