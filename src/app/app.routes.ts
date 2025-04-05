import { Routes } from '@angular/router'

export const routes: Routes = [
	{
		path: 'start',
		loadComponent: () => import('./start/start.component').then((m) => m.StartComponent),
	},
	{
		path: '',
		redirectTo: 'start',
		pathMatch: 'full',
	},
]
