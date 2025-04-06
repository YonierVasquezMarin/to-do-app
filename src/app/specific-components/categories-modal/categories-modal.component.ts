import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonModal, IonContent, IonList, IonItem, IonLabel, IonIcon, IonText } from '@ionic/angular/standalone'
import { Category } from '../../../models/business/task.model'
import { ellipsisVertical, checkmarkOutline } from 'ionicons/icons'

@Component({
	selector: 'app-categories-modal',
	templateUrl: './categories-modal.component.html',
	styleUrls: ['./categories-modal.component.scss'],
	standalone: true,
	imports: [CommonModule, IonModal, IonContent, IonList, IonItem, IonLabel, IonIcon, IonText],
})
export class CategoriesModalComponent {
	@Input() isOpen = false
	@Input() availableCategories: Category[] = []
	@Input() selectedCategories: Category[] = []
	@Output() isOpenChange = new EventEmitter<boolean>()
	@Output() categoryToggled = new EventEmitter<Category>()

	menuIcon = ellipsisVertical
	checkIcon = checkmarkOutline

	onDismiss() {
		this.isOpenChange.emit(false)
	}

	toggleCategory(category: Category) {
		this.categoryToggled.emit(category)
	}

	isCategorySelected(category: Category): boolean {
		return this.selectedCategories.some((c) => c.id === category.id)
	}
}
