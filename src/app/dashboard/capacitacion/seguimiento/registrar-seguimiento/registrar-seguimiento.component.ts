import { Component, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';
import { Router } from '@angular/router';

// Service
import { DinamicaService, global, UserService, ProfileService, UnitService, TrainingService } from 'src/app/services/service.index';

// Models
import { Training } from 'src/app/models/model.index';

@Component({
	selector: 'app-registrar-seguimiento',
	templateUrl: './registrar-seguimiento.component.html',
	styles: [],
	providers: [
		DinamicaService,
		ProfileService,
		TrainingService,
		UnitService,
		UserService,
	]
})
export class RegistrarSeguimientoComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public searchResponseMessage: string;
	public searchPreloaderStatus: boolean;
	public faSpinner = faSpinner;
	public buttonText: string;
	public actualDate: string;

	public token: string;
	public training: Training;
	public profiles: any;
	public units: any;

	public viewFlag: boolean;
	public editFlag: boolean;

	public services: Array<any>;
	public themes: Array<any>;

	constructor(
		private _dinamicaService: DinamicaService,
		private _profileService: ProfileService,
		private _trainingService: TrainingService,
		private _unitService: UnitService,
		private _userService: UserService,
		private _router: Router,
	) {
		this.loadPermissions();
		this.editFlag = true;
		this.buttonText = 'Registrar';

		this.token = this._userService.getToken();

		this.services = global.services;
		this.themes = global.temas;
	}

	ngOnInit(): void {
		this.status = undefined;
		this.responseMessage = undefined;
		this.training = undefined;

		this.actualDate = this.setMaxDate();

		this.getAllPromises();
	}

	loadPermissions(){
		let permissions = this._userService.getPermissions();
		this.viewFlag = false;

		if( permissions ){
			permissions.forEach( element => {
				if( element.id_operations == 5 ) this.viewFlag = true;
			});
		}
	}

	getAllPromises(){
		Promise.all([ this.unitList(), this.profileList() ])
			   .then( responses => {
				   this.units = responses[0];
				   this.profiles = responses[1];
				   this.training = new Training(null,this.actualDate,null,null,null,null,null,null);
			   })
			   .catch( error => {
				   this.status = 'error';
				   this.responseMessage = error;
			   })
	}

	onSubmit(trainingForm){
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this._trainingService.newTraining( this.training, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if( res.status == 'success' ){
					swal('Registro exitoso', res.message, 'success');
					trainingForm.reset();
					this._router.navigate(['/capacitaciones/seguimiento/listar']);
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

		this._dinamicaService.getByTernumdoc( this.training.documento ).subscribe(
			res => {
				this.searchPreloaderStatus = false;
				if( res.status == 'success' ){
					this.training.nombre = res.third.TERNOMCOM;
				}
			},
			error => {
				this.training.nombre = null;
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
}
