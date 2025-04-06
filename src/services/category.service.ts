import { Category, Task } from '../models/business/task.model'
import { Injectable } from '@angular/core'
import db from './database.service'

@Injectable({
	providedIn: 'root',
})
export class CategoryService {
	constructor() {}

	/**
	 * Gets all categories from the database
	 * @returns Promise<Category[]> List of categories
	 */
	public async getCategories(): Promise<Category[]> {
		try {
			return await db.categories.toArray()
		} catch (error) {
			console.error('Error getting categories:', error)
			return []
		}
	}

	/**
	 * Gets a category by its ID
	 * @param id Category ID
	 * @returns Promise<Category | undefined> Found category or undefined if it doesn't exist
	 */
	public async getCategoryById(id: number): Promise<Category | undefined> {
		try {
			return await db.categories.get(id)
		} catch (error) {
			console.error('Error getting category:', error)
			return undefined
		}
	}

	/**
	 * Adds a new category
	 * @param category Category to add
	 * @returns Promise<number> ID of the added category
	 */
	public async addCategory(category: Omit<Category, 'id'>): Promise<number> {
		try {
			return await db.categories.add(category)
		} catch (error) {
			console.error('Error adding category:', error)
			throw error
		}
	}

	/**
	 * Updates an existing category
	 * @param category Category with updated data
	 * @returns Promise<number> Number of updated records (1 if successful)
	 */
	public async updateCategory(category: Category): Promise<number> {
		try {
			if (!category.id) {
				throw new Error('Category must have an ID to be updated')
			}
			return await db.categories.update(category.id, category)
		} catch (error) {
			console.error('Error updating category:', error)
			throw error
		}
	}

	/**
	 * Deletes a category by its ID and removes it from all tasks that have it
	 * @param id ID of the category to delete
	 * @returns Promise<void>
	 */
	public async deleteCategory(id: number): Promise<void> {
		try {
			// First we get all tasks that have this category
			const tasksWithCategory = await db.tasks
				.filter((task: Task) => task.categories_ids?.includes(id) ?? false)
				.toArray()

			// We update each task to remove the category
			await Promise.all(
				tasksWithCategory.map(async (task: Task) => {
					const updatedCategoryIds = task.categories_ids?.filter((catId: number) => catId !== id) || []
					await db.tasks.update(task.id!, { ...task, categories_ids: updatedCategoryIds })
				})
			)

			// Finally we delete the category
			await db.categories.delete(id)
		} catch (error) {
			console.error('Error deleting category:', error)
			throw error
		}
	}
}
