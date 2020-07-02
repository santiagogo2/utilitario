import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { global, UserService, UpgdService } from 'src/app/services/service.index';
import { Caso } from 'src/app/models/model.index';

@Component({
	selector: 'app-caso',
	templateUrl: './caso.component.html',
	styles: [],
	providers: [
		UpgdService,
		UserService,
	]
})
export class CasoComponent implements OnInit {
	@Input() public caso: Caso;
	@Output() public sendCaseForm: EventEmitter<any> = new EventEmitter();
	public status: string;
	public responseMessage: string;
	public actualDate: string;
	public loadedInfo: boolean;

	public token: string;
	public caseForm: FormGroup;

	public auxiliares: Array<any>;
	public clasificaciones: Array<any>;
	public estados: Array<any>;
	public estadosFinal: Array<any>;
	public fuenteContagios: Array<any>;
	public profesionales: Array<any>;
	public respuestas: Array<any>;
	public upgds: any;

	constructor(
		private _upgdService: UpgdService,
		private _userService: UserService,
	) {
		this.loadedInfo = false;
		this.token = this._userService.getToken();
		this.actualDate = this.setMaxDate();
		
		this.auxiliares = global.auxiliares;
		this.clasificaciones = global.clasificacionCaso;
		this.estados = global.estados;
		this.estadosFinal = global.estadosFinal;
		this.fuenteContagios = global.fuenteContagio;
		this.profesionales = global.profesionales;
		this.respuestas = global.respuestas;
	}

	ngOnInit(): void {
		this.caseForm = new FormGroup({
			clasificacionCaso: new FormControl( null, [Validators.required] ),
			numeroRadicado: new FormControl( null, [Validators.required, Validators.pattern('[0-9]+')] ),
			fechaNotificacion: new FormControl( null, [Validators.required] ),
			fechaRecepcion: new FormControl( null, [Validators.required] ),
			upgd: new FormControl( null, [Validators.required] ),
			fechaAsignacionCaso: new FormControl( null, [Validators.required] ),
			fechaConsultaPersona: new FormControl( null, [Validators.required] ),
			fechaHospitalizacion: new FormControl( null, [Validators.required] ),
			fechaAsignacion: new FormControl( null, [Validators.required] ),
			asignacionProfesional: new FormControl( null, [Validators.required] ),
			asignacionAuxiliar: new FormControl( null, [Validators.required] ),
			searchIEC: new FormControl( null, [Validators.required] ),
			fechaIEC: new FormControl( null ),
			antecedenteViaje: new FormControl( null, [Validators.required] ),
			lugarViaje: new FormControl( null ),
			fuenteContagio: new FormControl( null, [Validators.required] ),
			fechaInicioSintomas: new FormControl( null, [Validators.required] ),
			fechaDiagnostico: new FormControl( null, [Validators.required] ),
			estadoPersona: new FormControl( null, [Validators.required] ),
			estadoFinal: new FormControl( null, [Validators.required] ),
		});

		this.getAllPromises();

		this.setObservables();
	}

	getAllPromises(){
		Promise.all([this.upgdList()])
			   .then( resp => {
				   this.upgds = resp[0];
				   this.loadedInfo = true;
				   if(this.caso) this.setCaseValues();
			   })
			   .catch( error => {
				   this.status = 'error';
				   this.responseMessage = error;
			   });
	}

	setObservables(){
		this.caseForm.get('lugarViaje').valueChanges.subscribe( value => {
			this.caseForm.get('lugarViaje').patchValue(this.upperCase(value), {emitEvent:false});
		});
		this.caseForm.get('searchIEC').valueChanges.subscribe( value => {
			if (value == 1) this.switchRequired('fechaIEC', Validators.required);
			else this.switchRequired('fechaIEC', null);
		});
		this.caseForm.get('antecedenteViaje').valueChanges.subscribe( value => {
			if (value == 1) this.switchRequired('lugarViaje', Validators.required);
			else this.switchRequired('lugarViaje', null);
		});
		this.caseForm.valueChanges.subscribe( value => {
			this.sendCaseForm.emit(this.caseForm);
		});
	}
	
	switchRequired(campo, requerido){
		this.caseForm.get(campo).setValidators(requerido);
		this.caseForm.get(campo).updateValueAndValidity({emitEvent:false, onlySelf:true});
	}

	setCaseValues(){
		this.caseForm.setValue({
			clasificacionCaso: this.caso.clasificacionCaso,
			numeroRadicado: this.caso.numeroRadicado,
			fechaNotificacion: this.caso.fechaNotificacion,
			fechaRecepcion: this.caso.fechaRecepcion,
			upgd: this.caso.UPGD_id,
			fechaAsignacionCaso: this.caso.fechaAsignacion,
			fechaConsultaPersona: this.caso.fechaConsultaPersona,
			fechaHospitalizacion: this.caso.fechaHospitalizacion,
			fechaAsignacion: this.caso.fechaAsignacion,
			asignacionProfesional: this.caso.asignacionProfesional,
			asignacionAuxiliar: this.caso.asignacionAuxiliar,
			searchIEC: this.caso.IEC,
			fechaIEC: this.caso.fechaIEC,
			antecedenteViaje: this.caso.antecedenteViaje,
			lugarViaje: this.caso.lugarViaje,
			fuenteContagio: this.caso.fuenteContagio,
			fechaInicioSintomas: this.caso.fechaInicioSintomas,
			fechaDiagnostico: this.caso.fechaDiagnostico,
			estadoPersona: this.caso.estadoPersona,
			estadoFinal: this.caso.estadoFinal,
		});
	}

	setMaxDate(){
		let date = new Date();
		let day = this.addZero( date.getDate() );
		let month = date.getMonth()+1;
		month = this.addZero( month );
		let year = date.getFullYear();
		return year+'-'+month+'-'+day;
	}

	addZero(number){
		if( number < 10 ){
			number = '0' + number.toString();
		}
		return number;
	}
	
	upperCase($event){
		if($event) return $event.toUpperCase();
		else return null;
	}

	//==========================================================================
	//================================Promises==================================
	//==========================================================================
	upgdList(){
		return new Promise((resolve, reject) => {
			this._upgdService.upgdList( this.token ).subscribe(
				res => {
					if( res.status == 'success' ){
						resolve( res.UPGD );
					}
				},
				error => {
					reject( error.error.message );
					console.log(<any>error);
				}
			);
		});
	}
}
