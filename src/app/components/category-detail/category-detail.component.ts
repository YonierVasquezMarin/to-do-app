import { Component } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { checkmarkOutline } from 'ionicons/icons'
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
} from '@ionic/angular/standalone'

@Component({
	selector: 'app-category-detail',
	templateUrl: './category-detail.component.html',
	styleUrls: ['./category-detail.component.scss'],
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
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
export class CategoryDetailComponent {
	checkIcon = checkmarkOutline

	category = {
		name: '',
		description: '',
		color: '',
	}

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

	selectColor(color: string) {
		this.selectedColor = color
		this.category.color = color
	}

	saveCategory() {
		// TODO: Implementar la lógica para guardar la categoría
		console.log('Categoría a guardar:', this.category)
	}
}
