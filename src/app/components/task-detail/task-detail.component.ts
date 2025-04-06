import { ErrorMessageComponent } from '../../shared/components/error-message/error-message.component'
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'
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
} from '@ionic/angular/standalone'
import { TaskService } from '../../../services/task.service'
import { checkmarkOutline, closeOutline } from 'ionicons/icons'
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'

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
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TaskDetailComponent implements OnInit {
	checkIcon = checkmarkOutline
	taskForm: FormGroup

	constructor(
		private formBuilder: FormBuilder,
		private taskService: TaskService,
		private router: Router,
		private toastController: ToastController
	) {
		this.taskForm = this.formBuilder.group({
			title: ['', [Validators.required, Validators.maxLength(50)]],
			description: ['', [Validators.maxLength(200)]],
		})
	}

	ngOnInit() {
		this.resetForm()
	}

	private resetForm() {
		this.taskForm.reset()
	}

	async saveTask() {
		if (this.taskForm.valid) {
			try {
				await this.taskService.createTask(this.taskForm.value)
				await this.showSuccessfulToast()
				this.router.navigate(['/home'])
			} catch (error) {
				console.error('Error al guardar la tarea:', error)
				await this.showErrorToast()
			}
		} else {
			this.taskForm.markAllAsTouched()
		}
	}

	private async showSuccessfulToast() {
		const toast = await this.toastController.create({
			message: 'Tarea creada exitosamente',
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
