import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

// Services
import { ActivityService, global, InsurerService, LocationService, PatientService, UpzService, UserService, ContactService } from '../../../services/service.index';

// Models
import { Upz, Patient } from '../../../models/model.index';

@Component({
	selector: 'app-paciente',
	templateUrl: './paciente.component.html',
	styles: [],
	providers: [
		ActivityService,
		ContactService,
		InsurerService,
		LocationService,
		PatientService,
		UpzService,
		UserService,
	]
})
export class PacienteComponent implements OnInit {
	@Output() public sendPatient: EventEmitter<any> = new EventEmitter();
	@Output() public sendError: EventEmitter<any> = new EventEmitter();
	@Output() public sendPatientForm: EventEmitter<any> = new EventEmitter();
	@Output() public updateFlag: EventEmitter<any> = new EventEmitter();
	@Output() public sendCase: EventEmitter<any> = new EventEmitter();
	@Output() public loaded: EventEmitter<any> = new EventEmitter();
	@Input() public documento: number;

	public faSpinner = faSpinner;
	public upzPreloaderStatus: boolean;
	public upzSearchResponseMessage: string;
	public patientPreloaderStatus: boolean;
	public patienSearchResponseMessage: string;
	public selectedLocation: number;
	public loadedInfo: boolean;

	public patientForm: FormGroup;
	public token: string;
	public activities: any;
	public upzs: any;
	public localidades: any;
	public insurers: any;
	public indices: any;
	public contacts: any;

	public gruposEdad: Array<any>;
	public gruposPoblacionales: Array<any>;
	public nacionalidades: Array<any>;
	public pertenenciasEtnicas: Array<any>;
	public sexos: Array<any>;
	public tipoDocumentos: Array<any>;
	public tiposRegimen: Array<any>;
	public unidadesMedida: Array<any>;

	constructor(
		private _activityService: ActivityService,
		private _contactService: ContactService,
		private _insurerService: InsurerService,
		private _locationService: LocationService,
		private _patientService: PatientService,
		private _upzService: UpzService,
		private _userService: UserService,
	) {
		this.loadedInfo = false; 

		this.token = this._userService.getToken();
		
		this.gruposEdad = global.gruposEdad;
		this.gruposPoblacionales = global.grupoPoblacional;
		this.nacionalidades = global.nacionalidades;
		this.pertenenciasEtnicas = global.pertenenciaEtnica;
		this.sexos = global.sexo;
		this.tipoDocumentos = global.tipoDocumento;
		this.tiposRegimen = global.tiposRegimen;
		this.unidadesMedida = global.unidadMedida;
	}

	ngOnInit(): void {
		this.patientForm = new FormGroup({
			documento: new FormControl( null, [ Validators.required, Validators.pattern('[0-9]+') ]),
			tipoDocumento: new FormControl( null, [ Validators.required ] ),
			primerNombre: new FormControl( null, [ Validators.required, Validators.pattern('[a-zA-ZÀ-ÿ ]+') ]),
			segundoNombre: new FormControl( '', [ Validators.pattern('[a-zA-ZÀ-ÿ ]+') ]),
			primerApellido: new FormControl( null, [ Validators.required, Validators.pattern('[a-zA-ZÀ-ÿ ]+') ]),
			segundoApellido: new FormControl( null, [ Validators.pattern('[a-zA-ZÀ-ÿ ]+') ]),
			edad: new FormControl( null, [ Validators.required, Validators.pattern('[0-9]+') ]),
			unidadMedida: new FormControl( 1, [ Validators.required ]),
			grupoEdad: new FormControl( null, [ Validators.required ]),
			sexo: new FormControl( null, [ Validators.required ]),
			nacionalidad: new FormControl( 1, [ Validators.required ]),
			ocupacion: new FormControl( null, [ Validators.required ]),
			pertenenciaEtnica: new FormControl( null, [ Validators.required ]),
			grupoEtnico: new FormControl( null ),
			grupoPoblacional: new FormControl( null, [ Validators.required ]),
			semanasGestacion: new FormControl( null ),
			direccion: new FormControl( null, [ Validators.required ]),
			barrio: new FormControl( null, [ Validators.required ]),
			location: new FormControl( null, [ Validators.required ]),
			upz: new FormControl( null, [ Validators.required ]),
			telefono: new FormControl( null, [ Validators.required, Validators.pattern('[0-9]+') ]),
			otroTelefono: new FormControl( null, [ Validators.pattern('[0-9]+') ]),
			insurer: new FormControl( null, [ Validators.required ]),
			tipoRegimen: new FormControl( null, [ Validators.required ]),
		});

		this.changesString();

		// Get all Promises
		Promise.all([this.insurersList(), this.locationsList(), this.activitiesList()])
			   .then( resp => {
			   		this.insurers = resp[0];
					this.localidades = resp[1];
					this.activities = resp[2];
					if( this.documento ){
						this.patientForm.patchValue({
							documento: this.documento
						});
						this.patientForm.controls.documento.disable();
						this.searchPatient();
					}
					this.loadedInfo = true;
					this.loaded.emit(this.loadedInfo);
			   })
			   .catch( error => {
			   		this.sendError.emit(error);
			   })
	}

	changesString(){
		this.patientForm.get('primerNombre').valueChanges.subscribe( value => {
			this.patientForm.get('primerNombre').patchValue(this.upperCase(value), {emitEvent:false});
		});
		this.patientForm.get('segundoNombre').valueChanges.subscribe( value => {
			this.patientForm.get('segundoNombre').patchValue(this.upperCase(value), {emitEvent:false});
		});
		this.patientForm.get('primerApellido').valueChanges.subscribe( value => {
			this.patientForm.get('primerApellido').patchValue(this.upperCase(value), {emitEvent:false});
		});
		this.patientForm.get('segundoApellido').valueChanges.subscribe( value => {
			this.patientForm.get('segundoApellido').patchValue(this.upperCase(value), {emitEvent:false});
		});
		this.patientForm.get('direccion').valueChanges.subscribe( value => {
			this.patientForm.get('direccion').patchValue(this.upperCase(value), {emitEvent:false});
		});
		this.patientForm.get('barrio').valueChanges.subscribe( value => {
			this.patientForm.get('barrio').patchValue(this.upperCase(value), {emitEvent:false});
		});
		this.patientForm.get('grupoEtnico').valueChanges.subscribe( value => {
			this.patientForm.get('grupoEtnico').patchValue(this.upperCase(value), {emitEvent:false});
		});
		this.patientForm.get('edad').valueChanges.subscribe( value => {
			let unidadMedida = this.patientForm.value.unidadMedida;
			let age = this.transformAge(value, unidadMedida);

			this.patientForm.patchValue({
				grupoEdad: this.setGrupoEdad(age),
			});
		});
		this.patientForm.get('unidadMedida').valueChanges.subscribe( value => {
			let age = this.patientForm.value.edad;
			if(!age) return;
			age = this.transformAge(age, value);

			this.patientForm.patchValue({
				grupoEdad: this.setGrupoEdad(age),
			});
		});
		this.patientForm.valueChanges.subscribe( value => {
			this.sendPatientForm.emit(this.patientForm);
			if(!value.documento) {
				this.indices = undefined;
				this.contacts = undefined;
			}
		});
		this.patientForm.get('pertenenciaEtnica').valueChanges.subscribe( value => {
			if (value == 1) this.switchRequired('grupoEtnico', Validators.required);
			else this.switchRequired('grupoEtnico', null);
		});
		this.patientForm.get('grupoPoblacional').valueChanges.subscribe( value => {
			if (value == 3) this.switchRequired('semanasGestacion', Validators.required);
			else this.switchRequired('semanasGestacion', null);
		});
	}
	
	switchRequired(campo, requerido){
		this.patientForm.get(campo).setValidators(requerido);
		if( !requerido ) this.patientForm.get(campo).setValue(null);
		this.patientForm.get(campo).updateValueAndValidity({emitEvent:false, onlySelf:true});
	}

	getUpzs(){
		let value = this.patientForm.get('location').value;
		this.upzPreloaderStatus = true;
		this.upzSearchResponseMessage = undefined;
		this.upzs = undefined;

		if(value == 5) {
			this.upzPreloaderStatus = false;
			return false;
		}

		this._upzService.getUpzByLocation(value, this.token).subscribe(
			res => {
				this.upzPreloaderStatus = false;
				if( res.status == 'success' ){
					this.upzs = res.UPZ;
				}
			},
			error => {
				this.upzPreloaderStatus = false;
				this.upzSearchResponseMessage = error.error.message;
				console.log(<any>error);
			}
		);
	}

	searchPatient(){
		let patient: any;
		let documento = this.patientForm.get('documento').value;

		this.patientPreloaderStatus = true;
		this.patienSearchResponseMessage = undefined;
		this.indices = undefined;
		this.contacts = undefined;

		this.patientForm.reset();
		this.patientForm.patchValue({documento:documento});

		this._patientService.getPatientByDocument( documento, this.token ).subscribe(
			res => {
				this.patientPreloaderStatus = false;
				if( res.status == 'success' ){
					patient = res.patient;
					let location_id = patient.upz.locations_id;
					this.updatePatientForm(patient, location_id);
					this.getUpzs();
					this.getIndices(patient.id);
					this.getContacts(patient.id);
					this.updateFlag.emit(patient.id);
					if( patient.caso ) this.sendCase.emit( patient.caso );
				}
			},
			error => {
				this.patientPreloaderStatus = false;
				this.patienSearchResponseMessage = error.error.message;
				this.updateFlag.emit(false);
				console.log(<any>error);
			}
		);
	}

	updatePatientForm(patient:Patient, location_id){
		this.patientForm.setValue({
			documento: patient.documento,
			tipoDocumento: patient.tipoDocumento,
			primerNombre: patient.primerNombre,
			segundoNombre: patient.segundoNombre,
			primerApellido: patient.primerApellido,
			segundoApellido: patient.segundoApellido,
			edad: patient.edad,
			unidadMedida: patient.unidadMedida,
			grupoEdad: patient.grupoEdad,
			sexo: patient.sexo,
			nacionalidad: patient.nacionalidad,
			ocupacion: patient.ocupacion,
			pertenenciaEtnica: patient.pertenenciaEtnica,
			grupoEtnico: patient.grupoEtnico,
			grupoPoblacional: patient.grupoPoblacional,
			semanasGestacion: patient.semanasGestacion,
			direccion: patient.direccion,
			barrio: patient.barrio,
			location: location_id,
			upz: patient.UPZ_id,
			telefono: patient.telefono,
			otroTelefono: patient.otroTelefono,
			insurer: patient.insurers_id,
			tipoRegimen: patient.tipoRegimen,
		});
	}

	getIndices(id){
		this._contactService.getMyIndiceCases( id, this.token ).subscribe(
			res => {
				if( res.status == 'success' ){
					this.indices = res.contacts.length > 0 ? res.contacts:undefined;
				}
			}
		);
	}

	getContacts(id){
		this._contactService.getMyContacts( id, this.token ).subscribe(
			res => {
				if( res.status == 'success' ){
					this.contacts = res.contacts.length > 0 ? res.contacts:undefined;
				}
			}
		);
	}
	
	upperCase($event){
		if($event) return $event.toUpperCase();
		else return null;
	}

	setGrupoEdad(edad){
		if( edad < 1 ) return 1;
		if( edad >= 1 && edad < 2 ) return 2;
		if( edad >= 2 && edad < 5 ) return 3;
		if( edad >= 5 && edad < 20 ) return 4;
		if( edad >= 20 && edad < 40 ) return 5;
		if( edad >= 40 && edad < 60  ) return 6;
		if( edad >= 60  ) return 7;
		return null;
	}

	transformAge(age, unidadMedida){
		age = unidadMedida == 2 ? age/12:age;
		age = unidadMedida == 3 ? age/365:age;
		return age;
	}

	//==========================================================================
	//================================Promises==================================
	//==========================================================================
	activitiesList(){
		return new Promise((resolve, reject) => {
			this._activityService.activitiesList( this.token ).subscribe(
				res => {
					if( res.status == 'success' ){
						resolve( res.activities );
					}
				},
				error => {
					reject( error );
					console.log( <any>error );
				}
			);
		});
	}
	insurersList(){
		return new Promise((resolve, reject) => {
			this._insurerService.insurerList( this.token ).subscribe(
				res => {
					if( res.status == 'success' ){
						resolve( res.insurers );
					}
				},
				error => {
					reject( error );
					console.log( <any>error );
				}
			);
		});
	}

	locationsList(){
		return new Promise((resolve, reject) => {
			this._locationService.locationsList(this.token).subscribe(
				res => {
					if( res.status == 'success' ){
						resolve( res.locations );
					}
				},
				error => {
					reject( error );
					console.log( <any>error );
				}
			);
		});
	}
}
