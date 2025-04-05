import { Routes } from '@angular/router'
import { tutorialGuard, reverseGuard } from '../guards/tutorial.guard'

export const routes: Routes = [
	{
		path: 'start',
		loadComponent: () => import('./start/start.component').then((m) => m.StartComponent),
		canActivate: [reverseGuard],
	},
	{
		path: 'home',
		loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),
		canActivate: [tutorialGuard],
	},
	{
		path: '',
		redirectTo: 'start',
		pathMatch: 'full',
	},
]
