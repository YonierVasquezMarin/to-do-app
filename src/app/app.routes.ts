import { Routes } from '@angular/router'

export const routes: Routes = [
	{
		path: 'start',
		loadComponent: () => import('./start/start.page').then((m) => m.StartPage),
	},
	{
		path: '',
		redirectTo: 'start',
		pathMatch: 'full',
	},
]
