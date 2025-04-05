import { Component } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { sparklesOutline, pricetagOutline } from 'ionicons/icons'

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

	onAdvancedFeatures() {
		// Implementar la navegación a funciones avanzadas
	}

	onCategories() {
		// Implementar la navegación a categorías
	}
}
