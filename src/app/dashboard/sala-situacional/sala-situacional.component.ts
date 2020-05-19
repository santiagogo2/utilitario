import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/service.index';

@Component({
	selector: 'app-sala-situacional',
	templateUrl: './sala-situacional.component.html',
	styles: []
})
export class SalaSituacionalComponent implements OnInit {

	public salaa: boolean;

	public identity: any;

	public salaSituacional: any[] = [
		// { titulo: 'usuarios', url: 'usuarios', class: 'imageContainer salaSituacionalUsuarios', imageUrl: 'assets/images/salaSituacional/usuarios.png' },
		{ titulo: 'colaboradores', url: 'colaboradores/listar', class: 'imageContainer color-green', imageUrl: 'assets/images/salaSituacional/colaboradores.png' },
		{ titulo: 'informes', url: 'informes', class: 'imageContainer color-red', imageUrl: 'assets/images/salaSituacional/informes.png' }
	]

	constructor(
		private _userService: UserService
	) {
		this.identity = this._userService.getIdentity();
		if(this.identity.role == 'REPORTS_ROLE'){
			let array = [];
			this.salaSituacional.forEach( (element) => {
				if(element.titulo == 'informes'){
					array.push(element);
				}
			});
			this.salaSituacional = array;
		}
	}

	ngOnInit(): void {
	}

	prueba(){
		alert('entre');
	}

}
