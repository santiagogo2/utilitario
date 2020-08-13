import { Component, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';

// Services
import { DinamicaService, EppTrackingService, global, ProfileService, UnitService, UserService } from 'src/app/services/service.index';

// Models
import { EppTracking } from 'src/app/models/model.index';

@Component({
	selector: 'app-editar-seguimiento-epp',
	templateUrl: '../registrar-seguimiento-epp/registrar-seguimiento-epp.component.html',
	styles: [],
	providers: [
		DinamicaService,
		EppTrackingService,
		ProfileService,
		UnitService,
		UserService,
	]
})
export class EditarSeguimientoEppComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public searchResponseMessage: string;
	public searchPreloaderStatus: boolean;
	public faSpinner = faSpinner;
	public buttonText: string;
	public actualDate: string;

	public token: string;
	public eppTracking: any;
	public profiles: any;
	public units: any;

	public services: Array<any>;
	public epps: Array<any>;

	constructor(
		private _dinamicaService: DinamicaService,
		private _eppTrackingService: EppTrackingService,
		private _profileService: ProfileService,
		private _unitService: UnitService,
		private _userService: UserService,
		private _router: Router,
		private _route: ActivatedRoute,
	) {		
		this.buttonText = 'Registrar';

		this.token = this._userService.getToken();

		this.services = global.services;
		this.epps = global.epps;
	}

	ngOnInit(): void {
		this._route.params.subscribe(params => {
			this.status = undefined;
			this.responseMessage = undefined;
			this.eppTracking = undefined;

			this.actualDate = this.setMaxDate();
			let id = +params['id'];

			this.getAllPromises(id);

		});
	}

	getAllPromises(id){
		Promise.all([ this.unitList(), this.profileList(), this.getEppTracking(id) ])
			   .then( responses => {
				   this.units = responses[0];
				   this.profiles = responses[1];
				   this.eppTracking = responses[2];
			   })
			   .catch( error => {
				   this.status = 'error';
				   this.responseMessage = error;
			   })
	}

	onSubmit(eppTrackingEditForm){
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this._eppTrackingService.updateEppTracking( this.eppTracking, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if( res.status == 'success' ){
					swal('Registro actualizado con éxito', res.message, 'success');
					this._router.navigate(['/epp/seguimiento/listar']);
				}
			},
			error => {
				this.preloaderStatus = false;
				this.status = error.error.status;
				this.responseMessage = error.error.message;

				if(error.error.errors){
					this.responseMessage = this.responseMessage + '. ' + JSON.stringify(error.error.errors);
				}

				swal('Error', this.responseMessage, 'error');
				console.log(<any>error);
			}
		);
	}

	searchThirdUser(){
		this.searchPreloaderStatus = true;
		this.searchResponseMessage = undefined;

		this._dinamicaService.getByTernumdoc( this.eppTracking.documento ).subscribe(
			res => {
				this.searchPreloaderStatus = false;
				if( res.status == 'success' ){
					this.eppTracking.nombre = res.third.TERNOMCOM;
				}
			},
			error => {
				this.eppTracking.nombre = null;
				this.searchPreloaderStatus = false;
				this.searchResponseMessage = error.error.message;
				console.log(<any> error);
			}
		);
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
	}

	//==========================================================================
	//================================Promises==================================
	//==========================================================================
	profileList(){
		return new Promise((resolve, reject) => {
			this._profileService.profileList( this.token ).subscribe(
				res => {
					if( res.status == 'success' ){
						resolve(res.profiles);
					}
				},
				error => {
					reject(error.error.message);
					console.log(<any>error);
				}
			);
		});
	}

	unitList(){
		return new Promise((resolve, reject) => {
			this._unitService.unitList( this.token ).subscribe(
				res => {
					if( res.status == 'success' ){
						resolve(res.units);
					}
				},
				error => {
					reject(error.error.message);
					console.log(<any>error);
				}
			);
		});
	}

	getEppTracking(id){
		return new Promise((resolve, reject) => {
			this._eppTrackingService.getEppTracking( id, this.token ).subscribe(
				res => {
					if( res.status == 'success' ){
						resolve(res.epptracking);
					}
				},
				error => {
					reject(error.error.message);
					console.log(<any>error);
				}
			);
		});
	}
}
