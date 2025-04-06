import { AdvancedFeature } from '../models/business/advanced-features.model'
import { Injectable } from '@angular/core'

@Injectable({
	providedIn: 'root',
})
export class AdvancedFeatureService {
	public pipeAdvancedFeatures(callback: (features: AdvancedFeature[]) => void): void {
		const features: AdvancedFeature[] = [
			{
				name: 'Ampliación de descripciones con IA',
				description:
					'Amplia facilmente detalles extra de tus tareas, encuentra esta opción al momento de crear o editar una tarea',
				actived: true,
			},
		]

		callback(features)
		setInterval(() => {
			callback(features)
		}, 5000)
	}
}
