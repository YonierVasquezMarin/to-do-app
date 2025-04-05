import { NgIf } from '@angular/common'
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { IonContent } from '@ionic/angular/standalone'
import { register } from 'swiper/element/bundle'
import { Router } from '@angular/router'
import { StorageService } from '../../services/storage.service'

register()

@Component({
	imports: [IonContent, NgIf],
	selector: 'app-home',
	templateUrl: 'start.component.html',
	styleUrls: ['start.component.scss'],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StartComponent {
	private swiper: any // It's a swiper reference

	constructor(private router: Router, private storageService: StorageService) {}

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

	async start() {
		await this.storageService.set('start-tutorial-watched', true)
		this.router.navigate(['/home'])
	}
}
