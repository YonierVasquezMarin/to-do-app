import { Component } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { sparkles } from 'ionicons/icons'

@Component({
	selector: 'app-advanced-features',
	templateUrl: './advanced-features.component.html',
	styleUrls: ['./advanced-features.component.scss'],
	standalone: true,
	imports: [IonicModule],
})
export class AdvancedFeaturesComponent {
	sparklesIcon = sparkles

	constructor() {}
}
