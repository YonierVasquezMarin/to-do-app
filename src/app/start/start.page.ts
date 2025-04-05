import { NgIf } from '@angular/common'
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { IonContent } from '@ionic/angular/standalone'
import { register } from 'swiper/element/bundle'

register()

@Component({
	imports: [IonContent, NgIf],
	selector: 'app-home',
	templateUrl: 'start.page.html',
	styleUrls: ['start.page.scss'],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StartPage {
	private swiper: any // It's a swiper reference

	constructor() {}

	ngAfterViewInit() {
		// Initialize swiper element
		this.swiper = document.querySelector('swiper-container')?.swiper
	}

	nextSlide() {
		if (this.swiper) {
			this.swiper.slideNext()
		}
	}

	prevSlide() {
		if (this.swiper) {
			this.swiper.slidePrev()
		}
	}

	isLastSlide(): boolean {
		return this.swiper && this.swiper.isEnd
	}

	start() {
		console.log('Iniciar la aplicación')
	}
}
