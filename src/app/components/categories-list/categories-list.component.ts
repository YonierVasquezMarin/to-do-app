import { Component } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { addOutline } from 'ionicons/icons'

@Component({
	selector: 'app-categories-list',
	templateUrl: './categories-list.component.html',
	standalone: true,
	imports: [IonicModule, CommonModule],
})
export class CategoriesListComponent {
	addIcon = addOutline

	constructor(private router: Router) {}

	navigateToNewCategory() {
		this.router.navigate(['/category-detail'])
	}
}
