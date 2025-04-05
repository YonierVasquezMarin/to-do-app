import {
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonFab,
	IonFabButton,
	IonIcon,
	IonButtons,
	IonButton,
	IonPopover,
	IonList,
	IonItem,
} from '@ionic/angular/standalone'
import { TaskListComponent } from '../components/task-list/task-list.component'
import { addOutline, ellipsisVertical, sparklesOutline, pricetagOutline } from 'ionicons/icons'
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { Router } from '@angular/router'

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	imports: [
		IonHeader,
		IonToolbar,
		IonTitle,
		IonContent,
		TaskListComponent,
		IonFab,
		IonFabButton,
		IonIcon,
		IonButtons,
		IonButton,
		IonPopover,
		IonList,
		IonItem,
	],
	standalone: true,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements OnInit {
	addIcon = addOutline
	menuIcon = ellipsisVertical
	starIcon = sparklesOutline
	tagIcon = pricetagOutline

	constructor(private router: Router) {}

	ngOnInit() {}

	navigateToTaskDetail() {
		this.router.navigate(['/task-detail'])
	}

	onAdvancedFeatures() {
		console.log('Funciones adicionales seleccionada')
	}

	onCategories() {
		console.log('Categorías seleccionada')
	}
}
