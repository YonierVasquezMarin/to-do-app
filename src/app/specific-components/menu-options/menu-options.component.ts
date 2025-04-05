import { Component } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { sparklesOutline, pricetagOutline } from 'ionicons/icons'
import { Router } from '@angular/router'

@Component({
	selector: 'app-menu-options',
	templateUrl: './menu-options.component.html',
	styleUrls: ['./menu-options.component.scss'],
	standalone: true,
	imports: [IonicModule],
})
export class MenuOptionsComponent {
	starIcon = sparklesOutline
	tagIcon = pricetagOutline

	constructor(private router: Router) {}

	onAdvancedFeatures() {
		// Implementar la navegación a funciones avanzadas
	}

	onCategories() {
		this.router.navigate(['/categories'])
	}
}
