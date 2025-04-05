import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
	selector: 'app-error-message',
	template: `
		<div class="error-message" [class.visible]="message">
			{{ message }}
		</div>
	`,
	styles: [
		`
			.error-message {
				color: transparent;
				font-size: 0.8rem;
				margin: 5px 0;
				padding-left: 16px;
				min-height: 1rem;
				transition: color 0.2s ease;
			}

			.error-message.visible {
				color: var(--ion-color-danger);
			}
		`,
	],
	standalone: true,
	imports: [CommonModule],
})
export class ErrorMessageComponent {
	@Input() message: string = ''
}
