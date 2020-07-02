import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

// Services
import { global, InsurerService, LocationService, PatientService, UpzService, UserService, ContactService } from '../../../services/service.index';

// Models
import { Upz, Patient } from '../../../models/model.index';

@Component({
	selector: 'app-paciente',
	templateUrl: './paciente.component.html',
	styles: [],
	providers: [
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

	public faSpinner = faSpinner;
	public upzPreloaderStatus: boolean;
	public upzSearchResponseMessage: string;
	public patientPreloaderStatus: boolean;
	public patienSearchResponseMessage: string;
	public selectedLocation: number;
	public loadedInfo: boolean;

	public patientForm: FormGroup;
	public token: string;
	public upzs: any;
	public localidades: any;
	public insurers: any;
	public indices: any;
	public contacts: any;

	public tipoDocumentos: Array<any>;
	public nacionalidades: Array<any>;
	public unidadesMedida: Array<any>;
	public sexos: Array<any>;
	public pertenenciasEtnicas: Array<any>;
	public gruposPoblacionales: Array<any>;
	public ocupaciones: Array<any>;

	constructor(
		private _contactService: ContactService,
		private _insurerService: InsurerService,
		private _locationService: LocationService,
		private _patientService: PatientService,
		private _upzService: UpzService,
		private _userService: UserService,
	) {
		this.loadedInfo = false; 

		this.token = this._userService.getToken();
		
		this.tipoDocumentos = global.tipoDocumento;
		this.nacionalidades = global.nacionalidades;
		this.unidadesMedida = global.unidadMedida;
		this.sexos = global.sexo;
		this.pertenenciasEtnicas = global.pertenenciaEtnica;
		this.gruposPoblacionales = global.grupoPoblacional;
		this.ocupaciones = global.ocupaciones;
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
			sexo: new FormControl( null, [ Validators.required ]),
			nacionalidad: new FormControl( 1, [ Validators.required ]),
			ocupacion: new FormControl( null, [ Validators.required ]),
			pertenenciaEtnica: new FormControl( null, [ Validators.required ]),
			grupoPoblacional: new FormControl( null, [ Validators.required ]),
			direccion: new FormControl( null, [ Validators.required ]),
			barrio: new FormControl( null, [ Validators.required ]),
			location: new FormControl( null, [ Validators.required ]),
			upz: new FormControl( null, [ Validators.required ]),
			telefono: new FormControl( null, [ Validators.required, Validators.pattern('[0-9]+') ]),
			insurer: new FormControl( null, [ Validators.required ]),
		});

		this.changesString();

		// Get all Promises
		Promise.all([this.insurersList(), this.locationsList()])
			   .then( resp => {
			   		this.insurers = resp[0];
					   this.localidades = resp[1];
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
		this.patientForm.valueChanges.subscribe( value => {
			this.sendPatientForm.emit(this.patientForm);
		});
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
		this.patientPreloaderStatus = true;
		this.patienSearchResponseMessage = undefined;
		let documento = this.patientForm.get('documento').value
		this.patientForm.reset();

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
			sexo: patient.sexo,
			nacionalidad: patient.nacionalidad,
			ocupacion: patient.ocupacion,
			pertenenciaEtnica: patient.pertenenciaEtnica,
			grupoPoblacional: patient.grupoPoblacional,
			direccion: patient.direccion,
			barrio: patient.barrio,
			location: location_id,
			upz: patient.UPZ_id,
			telefono: patient.telefono,
			insurer: patient.insurers_id,
		});
	}

	getIndices(id){
		this._contactService.getMyIndiceCases( id, this.token ).subscribe(
			res => {
				if( res.status == 'success' ){
					this.indices = res.contacts;
				}
			}
		);
	}

	getContacts(id){
		this._contactService.getMyContacts( id, this.token ).subscribe(
			res => {
				if( res.status == 'success' ){
					this.contacts = res.contacts;
				}
			}
		);
	}
	
	upperCase($event){
		if($event) return $event.toUpperCase();
		else return null;
	}

	//==========================================================================
	//================================Promises==================================
	//==========================================================================
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
