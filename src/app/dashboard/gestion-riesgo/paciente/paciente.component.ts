import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

// Services
import { global, InsurerService, LocationService, PatientService, UpzService, UserService } from '../../../services/service.index';

// Models
import { Upz } from '../../../models/model.index';

@Component({
	selector: 'app-paciente',
	templateUrl: './paciente.component.html',
	styles: [],
	providers: [
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
	@Output() public setPatientForm: EventEmitter<any> = new EventEmitter();
	@Input() public patient: any;

	public faSpinner = faSpinner;
	public upzPreloaderStatus: boolean;
	public upzSearchResponseMessage: string;
	public patientPreloaderStatus: boolean;
	public patienSearchResponseMessage: string;
	public selectedLocation: number;

	public patientForm: FormControl;
	public token: string;
	public upzs: any;
	public localidades: any;
	public insurers: any;

	public tipoDocumentos: Array<any>;
	public nacionalidades: Array<any>;
	public unidadesMedida: Array<any>;
	public sexos: Array<any>;
	public pertenenciasEtnicas: Array<any>;
	public gruposPoblacionales: Array<any>;
	public ocupaciones: Array<any>;

	constructor(
		private _insurerService: InsurerService,
		private _locationService: LocationService,
		private _patientService: PatientService,
		private _upzService: UpzService,
		private _userService: UserService,
	) {
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
		this.patientForm = new FormControl();

		// Get all Promises
		Promise.all([this.insurersList(), this.locationsList()])
			   .then( resp => {
			   		this.insurers = resp[0];
			   		this.localidades = resp[1];
			   })
			   .catch( error => {
			   		this.sendError.emit(error);
			   })
	}

	getUpzs(){
		this.upzPreloaderStatus = true;
		this.upzSearchResponseMessage = undefined;
		this.upzs = undefined;

		if(this.selectedLocation == 5) return false;

		this._upzService.getUpzByLocation(this.selectedLocation, this.token).subscribe(
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
		this.patientPreloaderStatus = true;
		this.patienSearchResponseMessage = undefined;

		this._patientService.getPatientByDocument( this.patient.documento, this.token ).subscribe(
			res => {
				this.patientPreloaderStatus = false;
				if( res.status == 'success' ){
					this.patient = res.patient;
					this.sendPatient.emit(this.patient);
					this.selectedLocation = this.patient.upz.locations_id;
					this.getUpzs();
					delete this.patient.upz;
				}
			},
			error => {
				this.patientPreloaderStatus = false;
				this.patienSearchResponseMessage = error.error.message;
				console.log(<any>error);
			}
		);
	}
	
	upperCase($event){
		if($event) return $event.toUpperCase();
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
