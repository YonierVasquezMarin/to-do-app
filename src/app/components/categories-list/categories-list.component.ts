import { Component } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { CommonModule } from '@angular/common'

@Component({
	selector: 'app-categories-list',
	templateUrl: './categories-list.component.html',
	standalone: true,
	imports: [IonicModule, CommonModule],
})
export class CategoriesListComponent {}
