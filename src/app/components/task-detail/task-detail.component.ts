import { ErrorMessageComponent } from '../../shared/components/error-message/error-message.component'
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { Task, Category } from '../../../models/business/task.model'
import { TaskService } from '../../../services/task.service'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import {
	trashOutline,
	addCircleOutline,
	closeCircleOutline,
	checkmarkCircleOutline,
	timeOutline,
	checkmarkOutline,
	sparklesOutline,
} from 'ionicons/icons'
import { CategoryService } from 'src/services/category.service'
import { CategoriesModalComponent } from '../../specific-components/categories-modal/categories-modal.component'
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
	IonTextarea,
	IonChip,
} from '@ionic/angular/standalone'
import { AdvancedFeatureService } from 'src/services/advanced-feature.service'

@Component({
	selector: 'app-task-detail',
	templateUrl: './task-detail.component.html',
	styleUrls: ['./task-detail.component.scss'],
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
		IonTextarea,
		IonChip,
		CategoriesModalComponent,
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TaskDetailComponent implements OnInit {
	checkIcon = checkmarkOutline
	trashIcon = trashOutline
	addIcon = addCircleOutline
	closeIcon = closeCircleOutline
	completeIcon = checkmarkCircleOutline
	timeIcon = timeOutline
	sparklesIcon = sparklesOutline
	taskForm: FormGroup
	task?: Task
	isEdit = false
	isCategoriesModalOpen = false
	availableCategories: Category[] = []
	selectedCategoryIds: number[] = []
	selectedCategories: Category[] = []
	isExpandingDescriptionsEnabled = false

	constructor(
		private formBuilder: FormBuilder,
		private taskService: TaskService,
		private router: Router,
		private toastController: ToastController,
		private categoryService: CategoryService,
		private advancedFeatureService: AdvancedFeatureService
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
			// Load categories from task if they exist
			if (this.task.categories_ids) {
				this.selectedCategoryIds = this.task.categories_ids
				this.updateSelectedCategories()
			}
		} else {
			this.resetForm()
		}

		this.loadCategories()

		// Subscribe to advanced features changes
		this.advancedFeatureService.pipeAdvancedFeatures((features) => {
			const expandingDescriptionsFeature = features.find((f) => f.id === 'expanding-descriptions-with-ia')
			this.isExpandingDescriptionsEnabled = expandingDescriptionsFeature?.actived ?? false
		})
	}

	private async updateSelectedCategories() {
		this.selectedCategories = this.availableCategories.filter((cat) => this.selectedCategoryIds.includes(cat.id!))
	}

	private async loadCategories() {
		this.availableCategories = await this.categoryService.getCategories()
		if (this.selectedCategoryIds.length > 0) {
			this.updateSelectedCategories()
		}
	}

	private resetForm() {
		this.taskForm.reset()
		this.selectedCategoryIds = []
		this.selectedCategories = []
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
			categories_ids: this.selectedCategoryIds,
		})
		await this.showSuccessfulToast('Tarea actualizada')
	}

	private async createTask() {
		await this.taskService.createTask({
			...this.taskForm.value,
			state_id: 1, // Pending state by default
			categories_ids: this.selectedCategoryIds,
		})
		await this.showSuccessfulToast('Tarea creada')
	}

	private async showSuccessfulToast(message: string = 'Tarea creada') {
		const toast = await this.toastController.create({
			message,
			duration: 2000,
			position: 'bottom',
			color: 'success',
			icon: checkmarkCircleOutline,
		})
		await toast.present()
	}

	private async showErrorToast() {
		const toast = await this.toastController.create({
			message: 'Error al guardar la tarea',
			duration: 2000,
			position: 'bottom',
			color: 'danger',
			icon: closeCircleOutline,
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

	async completeTask() {
		if (this.task?.id) {
			try {
				await this.taskService.updateTask({
					...this.task,
					state_id: 2, // Completed state
				})
				await this.showSuccessfulToast('Tarea completada')
				this.router.navigate(['/home'])
			} catch (error) {
				console.error('Error al completar la tarea:', error)
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

	openCategoriesModal() {
		this.isCategoriesModalOpen = true
	}

	onCategoryToggled(category: Category) {
		const categoryId = category.id!
		const index = this.selectedCategoryIds.indexOf(categoryId)
		if (index === -1) {
			this.selectedCategoryIds.push(categoryId)
			this.selectedCategories.push(category)
		} else {
			this.selectedCategoryIds.splice(index, 1)
			this.selectedCategories = this.selectedCategories.filter((c) => c.id !== categoryId)
		}
	}

	removeCategory(category: Category) {
		const categoryId = category.id!
		const index = this.selectedCategoryIds.indexOf(categoryId)
		if (index !== -1) {
			this.selectedCategoryIds.splice(index, 1)
			this.selectedCategories = this.selectedCategories.filter((c) => c.id !== categoryId)
		}
	}

	clearCategories() {
		this.selectedCategoryIds = []
		this.selectedCategories = []
		this.isCategoriesModalOpen = false
	}
}
