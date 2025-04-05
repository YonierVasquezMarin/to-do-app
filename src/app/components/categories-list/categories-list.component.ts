import { Component } from '@angular/core'
import { IonicModule } from '@ionic/angular'
import { CommonModule } from '@angular/common'

@Component({
	selector: 'app-categories-list',
	template: `
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-back-button defaultHref="/home"></ion-back-button>
				</ion-buttons>
				<ion-title>Categorías</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content>
			<ion-list>
				<ion-item-group>
					<ion-item-divider>
						<ion-label>Mis Categorías</ion-label>
					</ion-item-divider>

					<!-- Aquí irá la lista de categorías -->
					<ion-item>
						<ion-label>Personal</ion-label>
					</ion-item>
					<ion-item>
						<ion-label>Trabajo</ion-label>
					</ion-item>
				</ion-item-group>
			</ion-list>
		</ion-content>
	`,
	standalone: true,
	imports: [IonicModule, CommonModule],
})
export class CategoriesListComponent {}
