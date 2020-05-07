import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
	providedIn: 'root'
})
export class SettingsService {
	public ajustes: Ajustes;

	constructor(
	) {
	}
}

interface Ajustes {
	temaUrl: string,
	tema: string
}