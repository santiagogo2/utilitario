import { Component } from '@angular/core';
import { SettingsService } from './services/service.index';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: []
})
export class AppComponent {
	title = 'adminpro';

	constructor(
		private _settings: SettingsService
	){}
}
