import { Component, OnInit } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { checkmarkOutline, closeOutline } from 'ionicons/icons'
import { Router } from '@angular/router'
import { CategoryService } from '../../../services/category.service'
import { ErrorMessageComponent } from '../../shared/components/error-message/error-message.component'
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
	],
})
export class CategoryDetailComponent implements OnInit {
	checkIcon = checkmarkOutline
	categoryForm: FormGroup

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
		this.categoryForm = this.formBuilder.group({
			title: ['', [Validators.required, Validators.maxLength(60)]],
			color: ['', [Validators.required]],
		})
	}

	ngOnInit() {
		this.resetForm()
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
				await this.categoryService.addCategory(this.categoryForm.value)
				await this.showSuccessfulToast()
				this.router.navigate(['/categories'])
			} catch (error) {
				console.error('Error al guardar la categoría:', error)
				await this.showErrorToast()
			}
		} else {
			this.categoryForm.markAllAsTouched()
		}
	}

	private async showSuccessfulToast() {
		const toast = await this.toastController.create({
			message: 'Categoría creada exitosamente',
			duration: 2000,
			position: 'bottom',
			color: 'success',
			icon: checkmarkOutline,
		})
		await toast.present()
	}

	private async showErrorToast() {
		const toast = await this.toastController.create({
			message: 'Error al crear la categoría',
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
}
