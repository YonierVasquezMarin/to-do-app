import { Injectable } from '@angular/core'

@Injectable({
	providedIn: 'root',
})
export class StorageService {
	constructor() {}

	public async set(key: string, value: any): Promise<any> {
		try {
			localStorage.setItem(key, JSON.stringify(value))
			return value
		} catch (error) {
			console.error('Error guardando en localStorage:', error)
			return null
		}
	}

	public async get(key: string): Promise<any> {
		try {
			const item = localStorage.getItem(key)
			return item ? JSON.parse(item) : null
		} catch (error) {
			console.error('Error obteniendo de localStorage:', error)
			return null
		}
	}

	public async remove(key: string): Promise<boolean> {
		try {
			localStorage.removeItem(key)
			return true
		} catch (error) {
			console.error('Error removiendo de localStorage:', error)
			return false
		}
	}

	public async clear(): Promise<boolean> {
		try {
			localStorage.clear()
			return true
		} catch (error) {
			console.error('Error limpiando localStorage:', error)
			return false
		}
	}

	public async keys(): Promise<string[]> {
		try {
			return Object.keys(localStorage)
		} catch (error) {
			console.error('Error obteniendo keys de localStorage:', error)
			return []
		}
	}
}
