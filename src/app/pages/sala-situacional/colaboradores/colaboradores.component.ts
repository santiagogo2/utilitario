import { Component, OnInit } from '@angular/core';
import { Colaborators } from '../models/colaborators';
import { global } from '../../../services/global.service';

@Component({
	selector: 'app-colaboradores',
	templateUrl: './colaboradores.component.html',
	styles: []
})
export class ColaboradoresComponent implements OnInit {
	public arls: any[];
	public aseguradoras: any[];
	public estados: any[];
	public manejos: any[];
	public respuestas: any[];
	public sexo: any[];
	public tipoDocumento: any;

	public colaborator: Colaborators;

	constructor() {
		this.arls = global.arls;
		this.aseguradoras = global.aseguradoras;
		this.estados = global.estados;
		this.manejos = global.manejos;
		this.respuestas = global.respuestas;
		this.sexo = global.sexo;
		this.tipoDocumento = global.tipoDocumento;

		this.colaborator = new Colaborators(null,null,null,null,null,null,null,null,null,null,null,null,null,
											null,null,null,null,null,null,null,null,null,null,
											null,null,null,null,null,null,null,null,null,null,null);
	}

	ngOnInit(): void {
	}

	onSubmit(){
		console.log(this.colaborator);
	}

}
