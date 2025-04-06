import { IonIcon, IonCard, IonCardContent, IonText } from '@ionic/angular/standalone'
import { TaskService } from '../../../services/task.service'
import { Task } from '../../../models/business/task.model'
import { Component, OnInit } from '@angular/core'
import { libraryOutline } from 'ionicons/icons'
import { CommonModule } from '@angular/common'

@Component({
	selector: 'app-task-list',
	templateUrl: './task-list.component.html',
	styleUrls: ['./task-list.component.scss'],
	standalone: true,
	imports: [CommonModule, IonIcon, IonCard, IonCardContent, IonText],
})
export class TaskListComponent implements OnInit {
	libraryOutline = libraryOutline

	// Array to store the tasks
	tasks: Task[] = []

	constructor(private taskService: TaskService) {}

	async ngOnInit() {
		await this.loadTasks()
	}

	/**
	 * Load all tasks from the service
	 */
	async loadTasks(): Promise<void> {
		try {
			this.tasks = await this.taskService.getTasks()
		} catch (error) {
			console.error('Error loading tasks:', error)
		}
	}
}
