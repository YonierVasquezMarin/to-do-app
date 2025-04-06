import { Component } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { sparkles, pricetag } from 'ionicons/icons'
import { Router } from '@angular/router'

@Component({
	selector: 'app-menu-options',
	templateUrl: './menu-options.component.html',
	styleUrls: ['./menu-options.component.scss'],
	standalone: true,
	imports: [IonicModule],
})
export class MenuOptionsComponent {
	starIcon = sparkles
	tagIcon = pricetag

	constructor(private router: Router) {}

	onAdvancedFeatures() {
		this.router.navigate(['/advanced-features'])
	}

	onCategories() {
		this.router.navigate(['/categories'])
	}
}
