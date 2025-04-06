import { IonIcon, IonCard, IonCardContent, IonText, IonImg, IonChip } from '@ionic/angular/standalone'
import { libraryOutline, timeOutline, checkmarkCircleOutline } from 'ionicons/icons'
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CategoryService } from '../../../services/category.service'
import { Task, Category } from '../../../models/business/task.model'
import { TaskService } from '../../../services/task.service'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'

@Component({
	selector: 'app-task-list',
	templateUrl: './task-list.component.html',
	styleUrls: ['./task-list.component.scss'],
	standalone: true,
	imports: [CommonModule, IonIcon, IonCard, IonCardContent, IonText, IonImg, IonChip],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TaskListComponent implements OnInit {
	libraryOutline = libraryOutline
	timeIcon = timeOutline
	completeIcon = checkmarkCircleOutline

	tasks: Task[] = []
	categories: Category[] = []

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
		} catch (error) {
			console.error('Error loading tasks:', error)
		}
	}

	onTaskClick(task: Task) {
		this.router.navigate(['/task-detail'], {
			state: { task, isEdit: true },
		})
	}
}
