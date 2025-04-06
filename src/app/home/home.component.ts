import { MenuOptionsComponent } from '../specific-components/menu-options/menu-options.component'
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core'
import { TaskListComponent } from '../components/task-list/task-list.component'
import { addOutline, ellipsisVertical } from 'ionicons/icons'
import { Router } from '@angular/router'
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
} from '@ionic/angular/standalone'

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
		MenuOptionsComponent,
	],
	standalone: true,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements OnInit {
	addIcon = addOutline
	menuIcon = ellipsisVertical

	@ViewChild(TaskListComponent) taskListComponent!: TaskListComponent

	constructor(private router: Router) {}

	ngOnInit() {}

	ionViewWillEnter() {
		this.taskListComponent.ionViewWillEnter()
	}

	navigateToTaskDetail() {
		this.router.navigate(['/task-detail'])
	}
}
