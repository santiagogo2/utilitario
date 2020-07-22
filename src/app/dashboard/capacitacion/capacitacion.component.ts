import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-capacitacion',
	templateUrl: './capacitacion.component.html',
	styles: []
})
export class CapacitacionComponent implements OnInit {
	public identity: any;

	public training: any[] = [
		{ titulo: 'Seguimiento', url: 'seguimiento/listar', class: 'imageContainer color-green', imageUrl: 'assets/images/EPP/seguimiento.png' },
		{ titulo: 'Informes', url: 'informes', class: 'imageContainer color-violet', imageUrl: 'assets/images/EPP/informes.png' }
	]

	constructor() { }

	ngOnInit(): void {
	}
}
