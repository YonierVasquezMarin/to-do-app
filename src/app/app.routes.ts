import { Routes } from '@angular/router'

export const routes: Routes = [
	{
		path: 'home',
		loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),
	},
	{
		path: 'task-detail',
		loadComponent: () =>
			import('./components/task-detail/task-detail.component').then((m) => m.TaskDetailComponent),
	},
	{
		path: 'categories',
		loadComponent: () =>
			import('./components/categories-list/categories-list.component').then((m) => m.CategoriesListComponent),
	},
	{
		path: 'category-detail',
		loadComponent: () =>
			import('./components/category-detail/category-detail.component').then((m) => m.CategoryDetailComponent),
	},
	{
		path: 'advanced-features',
		loadComponent: () =>
			import('./components/advanced-features/advanced-features.component').then(
				(m) => m.AdvancedFeaturesComponent
			),
	},
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full',
	},
]
