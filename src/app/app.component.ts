import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone'
import { Component } from '@angular/core'

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	standalone: true,
	imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
	constructor() {}
}
