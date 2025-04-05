import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone'
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { TaskListComponent } from '../components/task-list/task-list.component'

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	imports: [IonHeader, IonToolbar, IonTitle, IonContent, TaskListComponent],
	standalone: true,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements OnInit {
	constructor() {}

	ngOnInit() {}
}
