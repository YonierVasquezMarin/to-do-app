import { ErrorMessageComponent } from '../../shared/components/error-message/error-message.component'
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { checkmarkOutline, closeOutline, trashOutline } from 'ionicons/icons'
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { TaskService } from '../../../services/task.service'
import { Task } from '../../../models/business/task.model'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import {
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonBackButton,
	IonButtons,
	IonList,
	IonItem,
	IonLabel,
	IonInput,
	IonButton,
	IonIcon,
	ToastController,
	IonFabButton,
} from '@ionic/angular/standalone'

@Component({
	selector: 'app-task-detail',
	templateUrl: './task-detail.component.html',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		ErrorMessageComponent,
		IonHeader,
		IonToolbar,
		IonTitle,
		IonContent,
		IonBackButton,
		IonButtons,
		IonList,
		IonItem,
		IonLabel,
		IonInput,
		IonButton,
		IonIcon,
		IonFabButton,
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TaskDetailComponent implements OnInit {
	checkIcon = checkmarkOutline
	trashIcon = trashOutline
	taskForm: FormGroup
	task?: Task
	isEdit = false

	constructor(
		private formBuilder: FormBuilder,
		private taskService: TaskService,
		private router: Router,
		private toastController: ToastController
	) {
		const navigation = this.router.getCurrentNavigation()
		if (navigation?.extras.state) {
			this.task = navigation.extras.state['task']
			this.isEdit = navigation.extras.state['isEdit']
		}

		this.taskForm = this.formBuilder.group({
			title: ['', [Validators.required, Validators.maxLength(50)]],
			description: ['', [Validators.maxLength(200)]],
		})
	}

	ngOnInit() {
		if (this.isEdit && this.task) {
			this.taskForm.patchValue({
				title: this.task.title,
				description: this.task.description,
			})
		} else {
			this.resetForm()
		}
	}

	private resetForm() {
		this.taskForm.reset()
	}

	async saveTask() {
		if (this.taskForm.valid) {
			try {
				if (this.isEdit && this.task?.id) {
					await this.editTask()
				} else {
					await this.createTask()
				}
				this.router.navigate(['/home'])
			} catch (error) {
				console.error('Error al guardar la tarea:', error)
				await this.showErrorToast()
			}
		} else {
			this.taskForm.markAllAsTouched()
		}
	}

	private async editTask() {
		await this.taskService.updateTask({
			id: this.task?.id,
			...this.taskForm.value,
		})
		await this.showSuccessfulToast('Tarea actualizada')
	}

	private async createTask() {
		await this.taskService.createTask(this.taskForm.value)
		await this.showSuccessfulToast('Tarea creada')
	}

	private async showSuccessfulToast(message: string = 'Tarea creada') {
		const toast = await this.toastController.create({
			message,
			duration: 2000,
			position: 'bottom',
			color: 'success',
			icon: checkmarkOutline,
		})
		await toast.present()
	}

	private async showErrorToast() {
		const toast = await this.toastController.create({
			message: 'Error al guardar la tarea',
			duration: 2000,
			position: 'bottom',
			color: 'danger',
			icon: closeOutline,
		})
		await toast.present()
	}

	async deleteTask() {
		if (this.task?.id) {
			try {
				await this.taskService.deleteTask(this.task.id)
				await this.showSuccessfulToast('Tarea eliminada')
				this.router.navigate(['/home'])
			} catch (error) {
				console.error('Error al eliminar la tarea:', error)
				await this.showErrorToast()
			}
		}
	}

	get titleError(): string {
		const control = this.taskForm.get('title')
		if (control?.errors && control.touched) {
			if (control.errors['required']) {
				return 'El título es requerido'
			}
		}
		return ''
	}

	get descriptionError(): string {
		const control = this.taskForm.get('description')
		if (control?.errors && control.touched) {
			if (control.errors['required']) {
				return 'La descripción es requerida'
			}
		}
		return ''
	}
}
