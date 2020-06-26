import { Component, OnInit } from '@angular/core';

// Services
import { UserService } from '../../services/service.index';

@Component({
	selector: 'app-epp',
	templateUrl: './epp.component.html',
	styles: [],
	providers: [
		UserService,
	]
})
export class EppComponent implements OnInit {
	public identity: any;

	public uci: any[] = [
		{ titulo: 'Seguimiento EPP', url: 'seguimiento/listar', class: 'imageContainer color-green', imageUrl: 'assets/images/gestionRiesgo/casos.png' },
		// { titulo: 'Toma de Muestras', url: 'toma-muestras/listar', class: 'imageContainer color-red', imageUrl: 'assets/images/gestionRiesgo/tomaMuestras.png' }

	]

	constructor(
		private _userService: UserService
	) {}

	ngOnInit(): void {
	}
}
