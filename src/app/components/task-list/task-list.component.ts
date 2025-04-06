import { IonList, IonItem, IonLabel } from '@ionic/angular/standalone'
import { TaskService } from '../../../services/task.service'
import { Task } from '../../../models/business/task.model'
import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
	selector: 'app-task-list',
	templateUrl: './task-list.component.html',
	standalone: true,
	imports: [CommonModule, IonList, IonItem, IonLabel],
})
export class TaskListComponent implements OnInit {
	// Array to store the tasks
	tasks: Task[] = []

	constructor(private taskService: TaskService) {}

	ngOnInit() {
		this.loadTasks()
	}

	/**
	 * This method runs every time the page is about to be shown.
	 */
	async ionViewWillEnter() {
		await this.loadTasks()
	}

	// Load all tasks from the service
	private async loadTasks(): Promise<void> {
		try {
			this.tasks = await this.taskService.getTasks()
		} catch (error) {
			console.error('Error loading tasks:', error)
		}
	}
}
