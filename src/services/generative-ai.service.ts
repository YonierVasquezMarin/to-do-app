import { AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_API_KEY, AZURE_OPENAI_DEPLOYMENT_NAME } from '../../global-environment'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { firstValueFrom } from 'rxjs'

interface OpenAIResponse {
	choices: Array<{
		message: {
			content: string
		}
	}>
}

@Injectable({
	providedIn: 'root',
})
export class GenerativeAIService {
	private readonly apiEndpoint = AZURE_OPENAI_ENDPOINT
	private readonly apiKey = AZURE_OPENAI_API_KEY
	private readonly deploymentName = AZURE_OPENAI_DEPLOYMENT_NAME

	constructor(private http: HttpClient) {}

	async generateTaskDescription(title: string): Promise<string> {
		const prompt = `Genera una descripción corta y concisa (máximo 2 líneas) para una tarea con el título: "${title}". 
                   La descripción debe ser profesional y orientada a la gestión de tareas.`

		const headers = new HttpHeaders().set('Content-Type', 'application/json').set('api-key', this.apiKey as string)

		const body = {
			messages: [
				{ role: 'system', content: 'Eres un asistente experto en gestión de tareas y productividad.' },
				{ role: 'user', content: prompt },
			],
			max_tokens: 100,
			temperature: 0.7,
		}

		try {
			const response = await firstValueFrom(
				this.http.post<OpenAIResponse>(
					`${this.apiEndpoint}/openai/deployments/${this.deploymentName}/chat/completions?api-version=2025-01-01-preview`,
					body,
					{ headers }
				)
			)
			return response.choices[0].message.content.trim()
		} catch (error) {
			console.error('Error generating task description:', error)
			throw error
		}
	}
}
