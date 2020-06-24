import { Component, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';

// Services
import { CaseService, global, InsurerService, LocationService, UpgdService, UserService, UpzService } from 'src/app/services/service.index';

// Models
import { Caso, User } from 'src/app/models/model.index';

@Component({
	selector: 'app-registrar-caso',
	templateUrl: './registrar-caso.component.html',	
	styles: [],
	providers: [
		CaseService,
		InsurerService,
		LocationService,
		UpgdService,
		UpzService,
		UserService,
	]
})
export class RegistrarCasoComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public buttonText: string;
	public faSpinner = faSpinner;
	public searchStatus: string;
	public searchResponseMessage: string;
	public searchPreloaderStatus: boolean;
	public upzSearchStatus: string;
	public upzSearchResponseMessage: string;
	public upzPreloaderStatus: boolean;
	public actualDate: string;
	public showSamples: boolean;

	public token: string;
	public identity: any;
	public insurers: any;
	public case: Caso;
	public users: User;

	public clasificaciones: Array<any>;
	public upgds: any;
	public respuestas: Array<any>;
	public tipoDocumentos: Array<any>;
	public unidadesMedida: Array<any>;
	public sexos: Array<any>;
	public localidades: any;
	public upzs: Array<any>;
	public fuenteContagios: Array<any>;
	public estados: Array<any>;

	public responsable: string;
	public usersFinded: User[];
	public selectedLocation: number;

	constructor(
		private _caseService: CaseService,
		private _insurerService: InsurerService,
		private _locationService: LocationService,
		private _upgdService: UpgdService,
		private _upzService: UpzService,
		private _userService: UserService,
	) {
		this.buttonText = 'Registrar';
		this.showSamples = false;

		this.token = this._userService.getToken();

		this.clasificaciones = global.clasificacionCaso;
		this.respuestas = global.respuestas;
		this.tipoDocumentos = global.tipoDocumento;
		this.unidadesMedida = global.unidadMedida;
		this.sexos = global.sexo;
		this.fuenteContagios = global.fuenteContagio;
		this.estados = global.estados;
	}

	ngOnInit(): void {
		this.status = undefined;
		this.responseMessage = undefined;
		this.getAllPromises();

		this.responsable = null;
		this.actualDate = this.setMaxDate();
	}

	getAllPromises(){
		Promise.all([ this.insurersList(), this.upgdList(), this.locationsList() ])
			   .then( responses => {
				   this.insurers = responses[0];
				   this.upgds = responses[1];
				   this.localidades = responses[2];
				   this.case = new Caso(null,null,null,null,null,null,null,null,null,null,null,null,null,
										null,null,null,null,null,null,null,null,null,null,null,null,
										null,null,null,null,null,null,null,null,null,null,null,null);
			   })
			   .catch( error => {
				   this.status = 'error';
				   this.responseMessage = error;
			   })
	}

	onSubmit(caseRegisterForm){
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this._caseService.newCase( this.case, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if( res.status == 'success' ){
					swal('Registro exitoso', res.message, 'success');
					this.usersFinded = undefined;
					this.selectedLocation = undefined;
					caseRegisterForm.reset();
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

	getUserByName(){
		this.searchStatus = undefined;
		this.searchResponseMessage = undefined;
		this.searchPreloaderStatus = true;
		this.usersFinded = undefined;
		this.case.user_id = undefined;

		this._userService.getUserByChain( this.responsable, this.token ).subscribe(
			res => {
				this.searchPreloaderStatus = false;
				if( res.status == 'success' ){
					this.usersFinded = res.users;
				}
			},
			error => {
				this.searchPreloaderStatus = false;
				this.searchStatus = error.error.status;
				this.searchResponseMessage = error.error.message;
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

	getUpzs(){
		if(this.selectedLocation == 5) return false;
		this.upzSearchStatus = undefined;
		this.upzSearchResponseMessage = undefined;
		this.upzPreloaderStatus = true;
		this.upzs = undefined;

		this._upzService.getUpzByLocation(this.selectedLocation, this.token).subscribe(
			res => {
				this.upzPreloaderStatus = false;
				if( res.status == 'success' ){
					this.upzs = res.UPZ;
				}
			},
			error => {
				this.upzPreloaderStatus = false;
				this.upzSearchStatus = error.error.status;
				this.upzSearchResponseMessage = error.error.message;
				console.log(<any>error);
			}
		);
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
					reject( error.error.message );
					console.log( <any>error );
				}
			);
		});
	}

	upgdList(){
		return new Promise((resolve, reject) => {
			this._upgdService.upgdList(this.token).subscribe(
				res => {
					if( res.status == 'success' ){
						resolve( res.UPGD );
					}
				},
				error => {
					reject( error.error.message );
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
					reject( error.error.message );
					console.log( <any>error );
				}
			);
		});
	}
}
