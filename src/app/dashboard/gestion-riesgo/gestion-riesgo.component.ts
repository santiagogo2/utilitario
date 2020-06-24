import { Component, OnInit } from '@angular/core';

// Services
import { UserService } from '../../services/service.index';

@Component({
  selector: 'app-gestion-riesgo',
  templateUrl: './gestion-riesgo.component.html',
  styles: []
})
export class GestionRiesgoComponent implements OnInit {
	public identity: any;

	public uci: any[] = [
		{ titulo: 'Casos', url: 'casos/listar', class: 'imageContainer color-green', imageUrl: 'assets/images/gestionRiesgo/casos.png' },
		{ titulo: 'Toma de Muestras', url: 'toma-muestras/listar', class: 'imageContainer color-red', imageUrl: 'assets/images/gestionRiesgo/tomaMuestras.png' }
	]

	constructor(
		private _userService: UserService
	) {
		this.identity = this._userService.getIdentity();
		if(this.identity.role == 'USER_UCI_INFORMES_ROLE' || this.identity.role == 'USER_INFORMES_ROLE'){
			let array = [];
			this.uci.forEach( (element) => {
				if(element.titulo == 'informes'){
					array.push(element);
				}
			});
			this.uci = array;
		}
	}

	ngOnInit(): void {
	}
}
