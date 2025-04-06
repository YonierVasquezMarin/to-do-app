import { IonIcon, IonCard, IonCardContent, IonText, IonImg, IonChip } from '@ionic/angular/standalone'
import { libraryOutline, timeOutline, checkmarkCircleOutline, filterOutline } from 'ionicons/icons'
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CategoryService } from '../../../services/category.service'
import { Task, Category } from '../../../models/business/task.model'
import { TaskService } from '../../../services/task.service'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { CategoriesModalComponent } from '../../specific-components/categories-modal/categories-modal.component'

@Component({
	selector: 'app-task-list',
	templateUrl: './task-list.component.html',
	styleUrls: ['./task-list.component.scss'],
	standalone: true,
	imports: [CommonModule, IonIcon, IonCard, IonCardContent, IonText, IonImg, IonChip, CategoriesModalComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TaskListComponent implements OnInit {
	libraryOutline = libraryOutline
	timeIcon = timeOutline
	completeIcon = checkmarkCircleOutline
	filterIcon = filterOutline

	tasks: Task[] = []
	filteredTasks: Task[] = []
	categories: Category[] = []
	selectedCategories: Category[] = []
	isCategoriesModalOpen = false
	isFilterActive = false

	constructor(private taskService: TaskService, private categoryService: CategoryService, private router: Router) {}

	async ngOnInit() {
		await this.loadCategories()
		await this.loadTasks()
	}

	private async loadCategories(): Promise<void> {
		try {
			this.categories = await this.categoryService.getCategories()
		} catch (error) {
			console.error('Error loading categories:', error)
		}
	}

	async loadTasks(): Promise<void> {
		try {
			this.tasks = await this.taskService.getTasks()
			this.applyFilters()
		} catch (error) {
			console.error('Error loading tasks:', error)
		}
	}

	onTaskClick(task: Task) {
		this.router.navigate(['/task-detail'], {
			state: { task, isEdit: true },
		})
	}

	openCategoriesModal() {
		this.isCategoriesModalOpen = true
	}

	onCategoryToggled(category: Category) {
		const index = this.selectedCategories.findIndex((c) => c.id === category.id)
		if (index === -1) {
			this.selectedCategories.push(category)
		} else {
			this.selectedCategories.splice(index, 1)
		}
		this.isFilterActive = this.selectedCategories.length > 0
		this.applyFilters()
	}

	clearFilters() {
		this.selectedCategories = []
		this.isFilterActive = false
		this.applyFilters()
		this.isCategoriesModalOpen = false
	}

	private applyFilters() {
		if (!this.isFilterActive) {
			this.filteredTasks = [...this.tasks]
			return
		}

		this.filteredTasks = this.tasks.filter((task) => {
			if (!task.categories_ids || task.categories_ids.length === 0) {
				return false
			}
			return this.selectedCategories.some((category) => task.categories_ids!.includes(category.id!))
		})
	}
}
