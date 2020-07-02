import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/service.index';

@Component({
	selector: 'app-seguimiento',
	templateUrl: './seguimiento.component.html',
	styles: [],
	providers: [
		UserService,
	]
})
export class SeguimientoComponent implements OnInit {public identity: any;

	public seguimientos: any[] = [
		{ titulo: 'Realizar seguimiento', url: 'buscar-usuario', class: 'imageContainer color-green', imageUrl: 'assets/images/gestionRiesgo/seguimientos/realizarSeguimiento.png' },
		{ titulo: 'Ver todos los seguimientos', url: 'listar', class: 'imageContainer color-red', imageUrl: 'assets/images/gestionRiesgo/seguimientos/verSeguimientos.png' },
	]

	constructor(
		private _userService: UserService
	) {
		this.identity = this._userService.getIdentity();
	}

	ngOnInit(): void {
	}
}
