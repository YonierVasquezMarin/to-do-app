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
		path: 'task-detail',
		loadComponent: () =>
			import('./components/task-detail/task-detail.component').then((m) => m.TaskDetailComponent),
		canActivate: [tutorialGuard],
	},
	{
		path: 'categories',
		loadComponent: () =>
			import('./components/categories-list/categories-list.component').then((m) => m.CategoriesListComponent),
		canActivate: [tutorialGuard],
	},
	{
		path: 'category-detail',
		loadComponent: () =>
			import('./components/category-detail/category-detail.component').then((m) => m.CategoryDetailComponent),
		canActivate: [tutorialGuard],
	},
	{
		path: 'advanced-features',
		loadComponent: () =>
			import('./components/advanced-features/advanced-features.component').then(
				(m) => m.AdvancedFeaturesComponent
			),
		canActivate: [tutorialGuard],
	},
	{
		path: '',
		redirectTo: 'start',
		pathMatch: 'full',
	},
]
