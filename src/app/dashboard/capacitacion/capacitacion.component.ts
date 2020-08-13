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

	constructor() {
		this.validatePermissions();
	}

	ngOnInit(): void {
	}

	validatePermissions(){
		let permissions = JSON.parse(localStorage.getItem('userOperations'));
		let array = [];
		permissions.forEach( element => {
			if( element.id_operations == 5 ) array.push(this.training[0]);
			if( element.id_operations == 6 ) array.push(this.training[1]);
		});
		this.training = array;
	}
}
