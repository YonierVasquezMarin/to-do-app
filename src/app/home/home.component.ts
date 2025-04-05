import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon } from '@ionic/angular/standalone'
import { TaskListComponent } from '../components/task-list/task-list.component'
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { addOutline } from 'ionicons/icons'
import { Router } from '@angular/router'

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	imports: [IonHeader, IonToolbar, IonTitle, IonContent, TaskListComponent, IonFab, IonFabButton, IonIcon],
	standalone: true,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements OnInit {
	addIcon = addOutline

	constructor(private router: Router) {}

	ngOnInit() {}

	navigateToTaskDetail() {
		this.router.navigate(['/task-detail'])
	}
}
