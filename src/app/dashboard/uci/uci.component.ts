import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/service.index';

@Component({
	selector: 'app-uci',
	templateUrl: './uci.component.html',
	styles: []
})
export class UciComponent implements OnInit {
	public identity: any;

	public uci: any[] = [
		{ titulo: 'ocupacion UCI', url: 'ocupacion/listar', class: 'imageContainer color-green', imageUrl: 'assets/images/UCI/ocupacionUCI.png' },
		{ titulo: 'informes', url: 'informes', class: 'imageContainer color-red', imageUrl: 'assets/images/UCI/informes.png' }
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
