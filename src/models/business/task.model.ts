export interface Task {
	id?: number
	title: string
	description: string
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
