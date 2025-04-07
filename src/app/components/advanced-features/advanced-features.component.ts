import { AdvancedFeatureService } from 'src/services/advanced-feature.service'
import { AdvancedFeature } from 'src/models/business/advanced-features.model'
import { IonicModule, ToastController } from '@ionic/angular'
import { sparkles, refreshCircle } from 'ionicons/icons'
import { NgFor, NgClass } from '@angular/common'
import { Component } from '@angular/core'

@Component({
	selector: 'app-advanced-features',
	templateUrl: './advanced-features.component.html',
	styleUrls: ['./advanced-features.component.scss'],
	standalone: true,
	imports: [IonicModule, NgFor, NgClass],
})
export class AdvancedFeaturesComponent {
	sparklesIcon = sparkles
	refreshIcon = refreshCircle
	features: AdvancedFeature[] = []

	constructor(private advancedFeatureService: AdvancedFeatureService, private toastController: ToastController) {}

	ngOnInit() {
		this.advancedFeatureService.pipeAdvancedFeatures((features) => {
			this.features = features
		})
	}

	async updateFeatures() {
		try {
			await this.advancedFeatureService.updateFeatureStates()
			this.showToast('Funciones actualizadas', 'success')
		} catch (error) {
			this.showToast('Error al actualizar las funciones', 'danger')
		}
	}

	private async showToast(message: string, color: string) {
		const toast = await this.toastController.create({
			message,
			duration: 2000,
			position: 'bottom',
			color,
		})
		await toast.present()
	}
}
