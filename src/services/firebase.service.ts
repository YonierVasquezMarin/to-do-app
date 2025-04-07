import { environment } from '../environments/environment'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { firstValueFrom } from 'rxjs'

interface FeatureFlags {
	[key: string]: boolean
}

@Injectable({
	providedIn: 'root',
})
export class FirebaseService {
	private readonly firebaseUrl = environment.firebaseUrl

	constructor(private http: HttpClient) {}

	/**
	 * Gets the value of a specific feature flag
	 * @param key The name of the feature flag to query
	 * @returns Promise with the boolean value of the feature flag
	 */
	async getValueByKey(key: string): Promise<boolean> {
		const response = await firstValueFrom(this.http.get<FeatureFlags>(this.firebaseUrl))
		return response[key] ?? false
	}
}
