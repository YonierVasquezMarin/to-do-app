import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons } from '@ionic/angular/standalone'

@Component({
	selector: 'app-task-detail',
	templateUrl: './task-detail.component.html',
	standalone: true,
	imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TaskDetailComponent implements OnInit {
	constructor() {}

	ngOnInit() {}
}
