import { Component, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute, Params } from '@angular/router';
import swal from 'sweetalert';

// Services
import { CaseService, global, InsurerService, UserService, UpgdService, LocationService, UpzService } from 'src/app/services/service.index';

// Models
import { Caso, User } from 'src/app/models/model.index';
import { Upz } from '../../../../models/admin/gestion-riesgo/upz';
import { error } from 'protractor';

@Component({
	selector: 'app-editar-caso',
	templateUrl: '../registrar-caso/registrar-caso.component.html',
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
export class EditarCasoComponent implements OnInit {
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

	public token: string;
	public identity: any;
	public insurers: any;
	public case: any;
	public users: User;

	public clasificaciones: Array<any>;
	public upgds: any;
	public respuestas: Array<any>;
	public tipoDocumentos: Array<any>;
	public unidadesMedida: Array<any>;
	public sexos: Array<any>;
	public localidades: any;
	public upzs: any;
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
		private _router: Router,
		private _route: ActivatedRoute,
	) {
		this.buttonText = 'Actualizar';

		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();

		this.clasificaciones = global.clasificacionCaso;
		this.respuestas = global.respuestas;
		this.tipoDocumentos = global.tipoDocumento;
		this.unidadesMedida = global.unidadMedida;
		this.sexos = global.sexo;
		this.fuenteContagios = global.fuenteContagio;
		this.estados = global.estados;
	}

	ngOnInit(): void {
		this._route.params.subscribe( params => {
			this.status = undefined;
			this.responseMessage = undefined;
			let id = params['id'];

			this.getAllPromises(id);
	
			this.responsable = null;
			this.actualDate = this.setMaxDate();
		});
	}

	getAllPromises(id){
		let maxPromise = 0;
		Promise.all([ this.insurersList(), this.getCase(id), this.upgdList(), this.locationsList() ])
			   .then( responses => {
				   this.insurers = responses[0];
				   this.case = responses[1];
				   this.selectedLocation = this.case.upz.locations_id;
				   this.getUpzs();
				   this.upgds = responses[2];
				   this.localidades = responses[3];
				   this.usersFinded = [];
				   this.usersFinded.push(this.case.user);
			   })
			   .catch( error => {
				   maxPromise++;
				   if(error.status == 500 && maxPromise < 4) this.getAllPromises(id);
				   this.status = error.error.status;
				   this.responseMessage = error.error.message;
			   })
	}

	onSubmit(casesEditForm){
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		delete this.case.user;
		delete this.case.upz;

		this._caseService.updateCase( this.case, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if( res.status == 'success' ){
					swal('Registro actualizado exitosamente', res.message, 'success');
					this.usersFinded = undefined;
					this.selectedLocation = undefined;
					this._router.navigate(['/gestion-riesgo/casos/listar']);
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
					reject( error );
					console.log( <any>error );
				}
			);
		});
	}

	getCase(id){
		return new Promise((resolve, reject) => {
			this._caseService.getCase( id, this.token ).subscribe(
				res => {
					if( res.status == 'success'){
						let error:any = {};
						error.error = {};
						let grcase = res.grcase;
						if(grcase.created_by != this.identity.sub ){
							if(this.identity.role != 'ADMIN_GESTION_RIESGO_ROLE' && this.identity.role != 'ADMIN_ROLE'){
								error.status = 'ok';
								error.error.status = 'error';
								error.error.message = 'Usted no tiene permisos para editar este caso.';
								reject(error);
							}
						}
						resolve(res.grcase);
					}
				},
				error => {
					reject( error );
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
