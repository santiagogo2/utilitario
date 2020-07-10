import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { global, UserService, UpgdService } from 'src/app/services/service.index';
import { Caso, User } from 'src/app/models/model.index';

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
	
	public auxiliares: any;
	public upgds: any;
	public profesionales: any;

	public clasificaciones: Array<any>;
	public condicionesIEC: Array<any>;
	public estados: Array<any>;
	public estadosFinal: Array<any>;
	public eventos: Array<any>;
	public fuenteContagios: Array<any>;
	public fuentesNotificacion: Array<any>;
	public respuestas: Array<any>;

	constructor(
		private _upgdService: UpgdService,
		private _userService: UserService,
	) {
		this.loadedInfo = false;
		this.token = this._userService.getToken();
		this.actualDate = this.setMaxDate();
		
		this.clasificaciones = global.clasificacionCaso;
		this.condicionesIEC = global.condicionesIEC;
		this.estados = global.estados;
		this.estadosFinal = global.estadosFinal;
		this.eventos = global.eventos;
		this.fuenteContagios = global.fuenteContagio;
		this.fuentesNotificacion = global.fuentesNotificacion;
		this.respuestas = global.respuestas;
	}

	ngOnInit(): void {
		this.caseForm = new FormGroup({
			clasificacionCaso: new FormControl( null, [Validators.required] ),
			fechaRadicado: new FormControl( null, [Validators.required] ),
			numeroRadicado: new FormControl( null, [Validators.required, Validators.pattern('[0-9]+')] ),
			fechaNotificacion: new FormControl( null, [Validators.required] ),
			upgd: new FormControl( null, [Validators.required] ),
			fuenteNotificacion: new FormControl( null, [Validators.required] ),
			fechaConsultaPersona: new FormControl( null, [Validators.required] ),
			evento: new FormControl( 2, [Validators.required] ),
			fechaHospitalizacion: new FormControl( null ),
			asignacionProfesional: new FormControl( null, [Validators.required] ),
			fechaProfesional: new FormControl( null, [Validators.required] ),
			asignacionAuxiliar: new FormControl( null, [Validators.required] ),
			fechaAuxiliar: new FormControl( null, [Validators.required] ),
			searchIEC: new FormControl( null, [Validators.required] ),
			fechaIEC: new FormControl( null ),
			condicionIEC: new FormControl( null ),
			observacionIEC: new FormControl( null ),
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
		Promise.all([this.upgdList(), this.getUsersByRole('USER_GESTION_RIESGO_PROFESIONAL_ROLE'), this.getUsersByRole('USER_GESTION_RIESGO_TECNICO_ROLE')])
			   .then( resp => {
				   this.upgds = resp[0];
				   this.profesionales = resp[1];
				   this.auxiliares = resp[2];
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
		this.caseForm.get('observacionIEC').valueChanges.subscribe( value => {
			this.caseForm.get('observacionIEC').patchValue(this.upperCase(value), {emitEvent:false});
		});
		this.caseForm.get('searchIEC').valueChanges.subscribe( value => {
			if (value == 1){
				this.switchRequired('fechaIEC', Validators.required);
				this.switchRequired('condicionIEC', Validators.required);
			} else {
				this.switchRequired('fechaIEC', null);
				this.switchRequired('condicionIEC', null);
			}
		});
		this.caseForm.get('condicionIEC').valueChanges.subscribe( value => {
			if (value == 2) this.switchRequired('observacionIEC', Validators.required);
			else this.switchRequired('observacionIEC', null);
		});
		this.caseForm.get('antecedenteViaje').valueChanges.subscribe( value => {
			if (value == 1) this.switchRequired('lugarViaje', Validators.required);
			else this.switchRequired('lugarViaje', null);
		});
		this.caseForm.get('evento').valueChanges.subscribe( value => {
			if (value == 3) this.switchRequired('fechaHospitalizacion', Validators.required);
			else this.switchRequired('fechaHospitalizacion', null);
		});
		this.caseForm.valueChanges.subscribe( value => {
			this.sendCaseForm.emit(this.caseForm);
		});
	}
	
	switchRequired(campo, requerido){
		this.caseForm.get(campo).setValidators(requerido);
		if( !requerido ) this.caseForm.get(campo).setValue(null);
		this.caseForm.get(campo).updateValueAndValidity({emitEvent:false, onlySelf:true});
	}

	setCaseValues(){
		this.caseForm.setValue({
			clasificacionCaso: this.caso.clasificacionCaso,
			fechaRadicado: this.caso.fechaRadicado,
			numeroRadicado: this.caso.numeroRadicado,
			fechaNotificacion: this.caso.fechaNotificacion,
			upgd: this.caso.UPGD_id,
			fuenteNotificacion: this.caso.fuenteNotificacion,
			fechaConsultaPersona: this.caso.fechaConsultaPersona,
			evento: this.caso.evento,
			fechaHospitalizacion: this.caso.fechaHospitalizacion,
			asignacionProfesional: this.caso.asignacionProfesional,
			fechaProfesional: this.caso.fechaProfesional,
			asignacionAuxiliar: this.caso.asignacionAuxiliar,
			fechaAuxiliar: this.caso.fechaAuxiliar,
			searchIEC: this.caso.IEC,
			fechaIEC: this.caso.fechaIEC,
			observacionIEC: this.caso.observacionIEC,
			condicionIEC: this.caso.condicionIEC,
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

	getUsersByRole(role){
		return new Promise((resolve, reject) => {
			this._userService.getUserByRole(role, this.token).subscribe(
				res => {
					if( res.status == 'success' ){
						resolve( res.users );
					}
				},
				error => {
					reject( error.error.message );
					console.log(<any>error);
				}
			)
		})
	}
}
