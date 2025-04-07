import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router'
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone'
import { bootstrapApplication } from '@angular/platform-browser'
import { provideHttpClient } from '@angular/common/http'
import { AppComponent } from './app/app.component'
import { routes } from './app/app.routes'

bootstrapApplication(AppComponent, {
	providers: [
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
		provideIonicAngular(),
		provideRouter(routes, withPreloading(PreloadAllModules)),
		provideHttpClient(),
	],
})
