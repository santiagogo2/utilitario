import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-contratacion',
	templateUrl: './contratacion.component.html',
	styles: []
})
export class ContratacionComponent implements OnInit {
	public contratacion: any[] = [
		{ titulo: 'contratistas', url: 'contratistas/listar', class: 'imageContainer color-orange', imageUrl: 'assets/images/contratacion/contractor.png' },
		{ titulo: 'contratos', url: 'contratos/listar', class: 'imageContainer color-yellow', imageUrl: 'assets/images/contratacion/contract.png' },
	]

	constructor() { }

	ngOnInit(): void {
	}

}
