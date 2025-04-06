import { ErrorMessageComponent } from '../../shared/components/error-message/error-message.component'
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { CategoryService } from '../../../services/category.service'
import { checkmarkOutline, closeOutline, trashOutline } from 'ionicons/icons'
import { Category } from '../../../models/business/task.model'
import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import {
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonList,
	IonItem,
	IonLabel,
	IonInput,
	IonBackButton,
	IonButtons,
	IonButton,
	IonIcon,
	ToastController,
	IonFab,
	IonFabButton,
} from '@ionic/angular/standalone'

@Component({
	selector: 'app-category-detail',
	templateUrl: './category-detail.component.html',
	styleUrls: ['./category-detail.component.scss'],
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		ErrorMessageComponent,
		IonHeader,
		IonToolbar,
		IonTitle,
		IonContent,
		IonList,
		IonItem,
		IonLabel,
		IonInput,
		IonBackButton,
		IonButtons,
		IonButton,
		IonIcon,
		IonFab,
		IonFabButton,
	],
})
export class CategoryDetailComponent implements OnInit {
	checkIcon = checkmarkOutline
	trashIcon = trashOutline
	categoryForm: FormGroup
	category?: Category
	isEdit = false

	colors = [
		'#FF6B6B',
		'#4ECDC4',
		'#45B7D1',
		'#96CEB4',
		'#FFEEAD',
		'#D4A5A5',
		'#9B59B6',
		'#3498DB',
		'#1ABC9C',
		'#F1C40F',
		'#E74C3C',
		'#2ECC71',
		'#34495E',
		'#E67E22',
		'#95A5A6',
	]

	selectedColor: string = ''

	constructor(
		private formBuilder: FormBuilder,
		private categoryService: CategoryService,
		private router: Router,
		private toastController: ToastController
	) {
		const navigation = this.router.getCurrentNavigation()
		if (navigation?.extras.state) {
			const state = navigation.extras.state as { category: Category; isEdit: boolean }
			this.category = state.category
			this.isEdit = state.isEdit
		}

		this.categoryForm = this.formBuilder.group({
			title: ['', [Validators.required, Validators.maxLength(30)]],
			color: ['', [Validators.required]],
		})
	}

	ngOnInit() {
		if (this.category) {
			this.categoryForm.patchValue({
				title: this.category.title,
				color: this.category.color,
			})
			this.selectedColor = this.category.color
		} else {
			this.resetForm()
		}
	}

	resetForm() {
		this.categoryForm.reset()
		this.selectedColor = ''
	}

	selectColor(color: string) {
		this.selectedColor = color
		this.categoryForm.patchValue({ color })
	}

	async saveCategory() {
		if (this.categoryForm.valid) {
			try {
				if (this.isEdit && this.category) {
					await this.createTask()
				} else {
					await this.editTask()
				}
				this.router.navigate(['/categories'])
			} catch (error) {
				console.error('Error al guardar la categoría:', error)
				await this.showErrorToast()
			}
		} else {
			this.categoryForm.markAllAsTouched()
		}
	}

	private async createTask() {
		await this.categoryService.updateCategory({
			...this.category,
			...this.categoryForm.value,
		})
		await this.showSuccessfulToast('Categoría actualizada exitosamente')
	}

	private async editTask() {
		await this.categoryService.addCategory(this.categoryForm.value)
		await this.showSuccessfulToast('Categoría creada exitosamente')
	}

	private async showSuccessfulToast(message: string = 'Categoría creada exitosamente') {
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
			message: 'Error al guardar la categoría',
			duration: 2000,
			position: 'bottom',
			color: 'danger',
			icon: closeOutline,
		})
		await toast.present()
	}

	get titleError(): string {
		const control = this.categoryForm.get('title')
		if (control?.errors && control.touched) {
			if (control.errors['required']) {
				return 'El nombre de la categoría es requerido'
			}
		}
		return ''
	}

	get colorError(): string {
		const control = this.categoryForm.get('color')
		if (control?.errors && control.touched) {
			if (control.errors['required']) {
				return 'Debe seleccionar un color'
			}
		}
		return ''
	}

	async deleteCategory() {
		if (!this.category?.id || !this.isEdit) {
			return
		}

		try {
			await this.categoryService.deleteCategory(this.category.id)
			await this.showSuccessfulToast('Categoría eliminada exitosamente')
			this.router.navigate(['/categories'])
		} catch (error) {
			console.error('Error al eliminar la categoría:', error)
			await this.showErrorToast()
		}
	}
}
