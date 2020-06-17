import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/service.index';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styles: []
})
export class HomeComponent implements OnInit {
	public preloaderImage: boolean;

	public identity: any;

	public homeLinks: any[] = [
		{ titulo: 'Contratación', url: '/contratacion', class: 'imageContainer color-violet', imageUrl: 'assets/images/contratacion.png' },
		{ titulo: 'Sala Situacional', url: '/sala-situacional', class: 'imageContainer', imageUrl: 'assets/images/salaSituacional.png' },
		{ titulo: 'UCI', url: '/uci', class: 'imageContainer color-dark-pink', imageUrl: 'assets/images/UCI.png' },
	]

	constructor(
		private _userService: UserService
	) {
		this.preloaderImage = true;

		this.identity = this._userService.getIdentity();
		let stringSplit = this.identity.role.split('_');
		let arraySplit = stringSplit[1];

		if(arraySplit == 'CONTRATACION'){
			let array = [];
			this.homeLinks.forEach( (element) => {
				if(element.titulo == 'Contratación'){
					array.push(element);
				}
			});
			this.homeLinks = array;
		} else if(arraySplit == 'SALA'){
			let array = [];
			this.homeLinks.forEach( (element) => {
				if(element.titulo == 'Sala Situacional'){
					array.push(element);
				}
			});
			this.homeLinks = array;
		} else if(arraySplit == 'INFORMES' || this.identity.role == 'USER_INFORMES_ROLE'){
			let array = [];
			this.homeLinks.forEach( (element) => {
				if(element.titulo == 'Sala Situacional' || element.titulo == 'UCI'){
					array.push(element);
				}
			});
			this.homeLinks = array;
		} else if( this.identity.role == 'USER_UCI_INFORMES_ROLE' || this.identity.role == 'USER_UCI_ROLE'){
			let array = [];
			this.homeLinks.forEach( (element) => {
				if(element.titulo == 'UCI'){
					array.push(element);
				}
			});
			this.homeLinks = array;
		}
	}

	ngOnInit(): void {
	}

	prueba(){
		alert('aja');
	}
}
