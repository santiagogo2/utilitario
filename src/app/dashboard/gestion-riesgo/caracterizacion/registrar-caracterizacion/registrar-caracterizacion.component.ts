import { Component, OnInit } from '@angular/core';

// Service
import { global } from '../../../../services/service.index';

// Models
import { Patient } from '../../../../models/model.index';

@Component({
	selector: 'app-registrar-caracterizacion',
	templateUrl: './registrar-caracterizacion.component.html',
	styles: []
})
export class RegistrarCaracterizacionComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public preloaderStatus: string;
	public buttonText: string;

	public patient: Patient;

	public tipoCaso: number;
	public tipoCasos: Array<any>;

	constructor() {
		this.buttonText = 'Registrar';
		this.patient = new Patient(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		
		this.tipoCasos = global.tipoCasos;
	}

	ngOnInit(): void {
	}

	onSubmit(form){
		console.log(this.patient);
		form.reset();
		console.log(form);
		console.log(this.tipoCaso);
	}

	recievePatient(patient: Patient){
		this.patient = patient;
	}

	recieveError(error){
		console.log(error);
	}
}
