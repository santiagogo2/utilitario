import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';

// Services
import { EppTrackingService, global, ProfileService, UnitService, UserService } from 'src/app/services/service.index';

// Models
import { EppTracking } from 'src/app/models/model.index';

@Component({
	selector: 'app-registrar-seguimiento-epp',
	templateUrl: './registrar-seguimiento-epp.component.html',
	styles: [],
	providers: [
		EppTrackingService,
		ProfileService,
		UnitService,
		UserService,
	]
})
export class RegistrarSeguimientoEppComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public buttonText: string;
	public actualDate: string;

	public token: string;
	public eppTracking: EppTracking;
	public profiles: any;
	public units: any;

	public services: Array<any>;
	public epps: Array<any>;

	constructor(
		private _eppTrackingService: EppTrackingService,
		private _profileService: ProfileService,
		private _unitService: UnitService,
		private _userService: UserService,
	) {		
		this.buttonText = 'Registrar';

		this.token = this._userService.getToken();

		this.services = global.services;
		this.epps = global.epps;
	}

	ngOnInit(): void {
		this.status = undefined;
		this.responseMessage = undefined;
		this.actualDate = this.setMaxDate();
		this.getAllPromises();

	}

	getAllPromises(){
		Promise.all([ this.unitList(), this.profileList() ])
			   .then( responses => {
				   this.units = responses[0];
				   this.profiles = responses[1];
				   this.eppTracking = new EppTracking(null,this.actualDate,null,null,null,null,null,null);
			   })
			   .catch( error => {
				   this.status = 'error';
				   this.responseMessage = error;
			   })
	}

	onSubmit(eppTrackingRegisterForm){
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this._eppTrackingService.newEppTracking( this.eppTracking, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if( res.status == 'success' ){
					swal('Registro exitoso', res.message, 'success');
					eppTrackingRegisterForm.reset();
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
}
