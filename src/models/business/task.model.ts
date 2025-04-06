export interface State {
	id?: number
	name: string
}

export interface Category {
	id?: number
	name: string
	color: string
}

export interface Task {
	id?: number
	title: string
	description: string
	state_id: number
	categories_ids?: number[]
}
