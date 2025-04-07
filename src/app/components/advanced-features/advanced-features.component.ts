import { AdvancedFeatureService } from 'src/services/advanced-feature.service'
import { AdvancedFeature } from 'src/models/business/advanced-features.model'
import { IonicModule } from '@ionic/angular'
import { Component } from '@angular/core'
import { sparkles } from 'ionicons/icons'
import { NgFor, NgClass } from '@angular/common'

@Component({
	selector: 'app-advanced-features',
	templateUrl: './advanced-features.component.html',
	styleUrls: ['./advanced-features.component.scss'],
	standalone: true,
	imports: [IonicModule, NgFor, NgClass],
})
export class AdvancedFeaturesComponent {
	sparklesIcon = sparkles
	features: AdvancedFeature[] = []

	constructor(private advancedFeatureService: AdvancedFeatureService) {}

	ngOnInit() {
		this.advancedFeatureService.pipeAdvancedFeatures((features) => {
			this.features = features
		})
	}
}
