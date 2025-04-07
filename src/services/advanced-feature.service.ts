import { AdvancedFeature } from '../models/business/advanced-features.model'
import { FirebaseService } from './firebase.service'
import { Injectable } from '@angular/core'

@Injectable({
	providedIn: 'root',
})
export class AdvancedFeatureService {
	private readonly timeToUpdate = 10000 // 10 seconds
	private static readonly features: AdvancedFeature[] = [
		{
			id: 'expanding-descriptions-with-ia',
			title: 'Ampliación de descripciones con IA',
			description:
				'Amplia facilmente detalles extra de tus tareas, encuentra esta opción al momento de crear o editar una tarea',
			actived: false,
		},
	]

	constructor(private firebaseService: FirebaseService) {}

	/**
	 * This method updates the state of advanced features based on the Firebase Realtime Database.
	 * It fetches the current state of each feature and updates the 'actived' property accordingly.
	 * The method is called initially and then every 10 seconds to ensure the state is always up-to-date.
	 */
	public pipeAdvancedFeatures(callback: (features: AdvancedFeature[]) => void): void {
		const updateFeatureStates = async () => {
			for (const feature of AdvancedFeatureService.features) {
				try {
					feature.actived = await this.firebaseService.getValueByKey(feature.id)
				} catch (error) {
					console.error(`Error al obtener el estado de la característica ${feature.id}:`, error)
				}
			}
			callback(AdvancedFeatureService.features)
		}

		// Initial update
		updateFeatureStates()

		// Periodic update every 10 seconds
		setInterval(updateFeatureStates, this.timeToUpdate)
	}

	async updateFeatureStates(): Promise<void> {
		for (const feature of AdvancedFeatureService.features) {
			try {
				feature.actived = await this.firebaseService.getValueByKey(feature.id)
			} catch (error) {
				console.error(`Error al obtener el estado de la característica ${feature.id}:`, error)
			}
		}
	}
}
