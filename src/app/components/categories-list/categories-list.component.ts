import { Component, OnInit } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { addOutline } from 'ionicons/icons'
import { CategoryService } from '../../../services/category.service'
import { Category } from '../../../models/business/task.model'

@Component({
	selector: 'app-categories-list',
	templateUrl: './categories-list.component.html',
	styleUrls: ['./categories-list.component.scss'],
	standalone: true,
	imports: [IonicModule, CommonModule],
})
export class CategoriesListComponent implements OnInit {
	addIcon = addOutline
	categories: Category[] = []

	constructor(private router: Router, private categoryService: CategoryService) {}

	async ngOnInit() {
		await this.loadCategories()
	}

	/**
	 * This method is executed every time the page is about to be shown.
	 */
	async ionViewWillEnter() {
		await this.loadCategories()
	}

	async loadCategories() {
		this.categories = await this.categoryService.getCategories()
	}

	navigateToNewCategory() {
		this.router.navigate(['/category-detail'])
	}

	navigateToEditCategory(category: Category) {
		this.router.navigate(['/category-detail'], {
			state: { category: category, isEdit: true },
		})
	}
}
