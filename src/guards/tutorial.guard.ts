import { inject } from '@angular/core'
import { Router } from '@angular/router'
import { StorageService } from '../services/storage.service'

export const tutorialGuard = async () => {
	const storageService = inject(StorageService)
	const router = inject(Router)

	const tutorialWatched = await storageService.get('start-tutorial-watched')

	if (!tutorialWatched) {
		router.navigate(['/start'])
		return false
	}

	return true
}

export const reverseGuard = async () => {
	const storageService = inject(StorageService)
	const router = inject(Router)

	const tutorialWatched = await storageService.get('start-tutorial-watched')

	if (tutorialWatched) {
		router.navigate(['/home'])
		return false
	}

	return true
}
