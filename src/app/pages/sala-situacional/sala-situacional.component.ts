import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-sala-situacional',
	templateUrl: './sala-situacional.component.html',
	styles: []
})
export class SalaSituacionalComponent implements OnInit {

	public salaa: boolean;

	public salaSituacional: any[] = [
		{ titulo: 'usuarios', url: 'usuarios', class: 'imageContainer salaSituacionalUsuarios' },
		{ titulo: 'colaboradores', url: 'colaboradores', class: 'imageContainer color-green' },
		{ titulo: 'informes', url: 'informes', class: 'imageContainer color-red' }
	]

	constructor() {
	}

	ngOnInit(): void {
	}

}
