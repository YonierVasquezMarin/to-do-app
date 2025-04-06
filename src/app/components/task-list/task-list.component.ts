import { IonIcon, IonCard, IonCardContent, IonText, IonImg, IonChip } from '@ionic/angular/standalone'
import { TaskService } from '../../../services/task.service'
import { Task } from '../../../models/business/task.model'
import { Component, OnInit } from '@angular/core'
import { libraryOutline, timeOutline, checkmarkCircleOutline } from 'ionicons/icons'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'

@Component({
	selector: 'app-task-list',
	templateUrl: './task-list.component.html',
	styleUrls: ['./task-list.component.scss'],
	standalone: true,
	imports: [CommonModule, IonIcon, IonCard, IonCardContent, IonText, IonImg, IonChip],
})
export class TaskListComponent implements OnInit {
	libraryOutline = libraryOutline
	timeIcon = timeOutline
	completeIcon = checkmarkCircleOutline

	// Array to store the tasks
	tasks: Task[] = []

	constructor(private taskService: TaskService, private router: Router) {}

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

	onTaskClick(task: Task) {
		this.router.navigate(['/task-detail'], {
			state: { task, isEdit: true },
		})
	}
}
