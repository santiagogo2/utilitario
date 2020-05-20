import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styles: []
})
export class HomeComponent implements OnInit {
	public preloaderImage: boolean;

	public homeLinks: any[] = [
		{ titulo: 'Contratación', url: '/contratacion', class: 'imageContainer color-violet', imageUrl: 'assets/images/contratacion.png' },
		{ titulo: 'Sala Situacional', url: '/sala-situacional', class: 'imageContainer', imageUrl: 'assets/images/salaSituacional.png' },
	]

	constructor() {
		this.preloaderImage = true;
	}

	ngOnInit(): void {
	}

	prueba(){
		alert('aja');
	}
}
