import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Collaborators } from '../../../../models/model.index';
import { global } from '../../../../services/service.index';

import { AreaService, ArlService, InsurerService, CollaboratorsService, ProfileService, UnitService, UserService } from '../../../../services/service.index';

import swal from 'sweetalert';

@Component({
	selector: 'app-editar-colaboradores',
	templateUrl: '../registrar-colaboradores/registrar-colaboradores.component.html',
	styles: [],
	providers: [
		AreaService,
		ArlService,
		CollaboratorsService,
		InsurerService,
		ProfileService,
		UnitService,
		UserService
	]
})
export class EditarColaboradoresComponent implements OnInit {
	public page_title: string;
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public buttonTitle: string;

	public areas: any;
	public arls: any;
	public insurers: any;
	public estados: Array<any>;
	public manejos: Array<any>;
	public nexos: Array<any>;
	public profiles: any;
	public respuestas: Array<any>;
	public sexo: Array<any>;
	public tipoDocumento: Array<any>;
	public tipoVinculacion: Array<any>;
	public units: any;

	public collaborator: any;
	public token: string;

	constructor(
		private _areaService: AreaService,
		private _arlService: ArlService,
		private _collaboratorService: CollaboratorsService,
		private _insurerService: InsurerService,
		private _profileService: ProfileService,
		private _unitService: UnitService,
		private _userService: UserService,
		private _router: Router,
		private _route: ActivatedRoute
	) {
		this.buttonTitle = 'Actualizar';
		
		this.estados = global.estados;
		this.manejos = global.manejos;
		this.nexos = global.nexos;
		this.respuestas = global.respuestas;
		this.sexo = global.sexo;
		this.tipoDocumento = global.tipoDocumento;
		this.tipoVinculacion = global.tipoVinculacion;
		
		this.token = this._userService.getToken();
	}

	ngOnInit(): void {
		// Obtener Información Inicial
		this._route.params.subscribe(params => {
			this.status = undefined;
			this.responseMessage = undefined;
			this.collaborator = undefined;

			let id = +params['id'];

			Promise.all([
						this.areaList(),
						this.profileList(),
						this.unitList(),
						this.arlList(),
						this.insurerList(),
						this.getCollaborator(id)
					])
					.then( responses => {
						this.areas = responses[0];
						this.profiles = responses[1];
						this.units = responses[2];
						this.arls = responses[3];
						this.insurers = responses[4];
						this.collaborator = responses[5];
					})
					.catch( error => {
						this.status = 'error';
						this.responseMessage = error;
					});
		});

		this.getDataRouter().subscribe(
			response => {
				this.buttonTitle = response.titulo;
			}
		);	
	}

	onSubmit(editCollaboratorsForm){
		this._collaboratorService.updateRegister(this.collaborator, this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this.status = response.status;
					this.responseMessage = response.message;
					swal('Registro exitoso', this.responseMessage, 'success');
					this._router.navigate(['/sala-situacional/colaboradores/listar']);
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

	calculateAge(event){
		let actualDate: any = new Date();
		let bornDate: any = new Date(event);
		this.collaborator.edad = Math.trunc((actualDate - bornDate)/(1000*60*60*24*365));
	}

	calculateTakeDays(event){
		if(this.collaborator.fechaResultado){
			let resultadoDate: any = new Date(this.collaborator.fechaResultado);
			let tomaMuestraDate: any = new Date(event);
			this.collaborator.diasTranscurridos = Math.trunc((resultadoDate-tomaMuestraDate)/(1000*60*60*24));
		}
	}

	calculateResultDays(event){
		if(this.collaborator.fechaTomaMuestra){
			let tomaMuestraDate: any = new Date(this.collaborator.fechaTomaMuestra);
			let resultadoDate: any = new Date(event);
			this.collaborator.diasTranscurridos = Math.trunc((resultadoDate-tomaMuestraDate)/(1000*60*60*24));
		}
	}

	getDataRouter(){
		return this._router.events.pipe(
			filter( evento => evento instanceof ActivationEnd ), // Si el evento es una instancia de ActivationEnd
			filter( (evento: ActivationEnd) => evento.snapshot.firstChild == null),
			map( (evento: ActivationEnd) => evento.snapshot.data )
		);
	}


	//===================================================================================================
	//=============================================Promesas==============================================
	//===================================================================================================

	getCollaborator(id){
		return new Promise((resolve, reject) => {
			this._collaboratorService.getCollaborator(id, this.token).subscribe(
				response => {
					resolve( response.collaborator );
				},
				error => {
					reject( error.error.message );
					swal('Error', this.responseMessage, 'error');
					console.log(<any>error);
				}
			);			
		});
	}

	areaList(){
		return new Promise((resolve, reject) => {
			this._areaService.areaList( this.token ).subscribe(
				res => {
					if( res.status == 'success' ){
						resolve( res.areas );
					}
				},
				error => {
					reject( error.error.message );
					console.log(<any>error);
				}
			);			
		});

	}
	arlList(){
		return new Promise((resolve, reject) => {
			this._arlService.arlList( this.token ).subscribe(
				res => {
					if( res.status == 'success' ){
						resolve( res.arls );
					}
				},
				error => {
					reject( error.error.message );
					console.log(<any>error);
				}
			);
		});
	}
	insurerList(){
		return new Promise((resolve, reject) => {
			this._insurerService.insurerList( this.token ).subscribe(
				res => {
					if( res.status == 'success' ){
						resolve( res.insurers );
					}
				},
				error => {
					reject( error.error.message );
					console.log(<any> error);
				}
			);
		});
	}
	profileList(){
		return new Promise((resolve, reject) => {
			this._profileService.profileList( this.token ).subscribe(
				res => {
					if( res.status == 'success' ){
						resolve( res.profiles );
					}
				},
				error => {
					reject( error.error.message );
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
						resolve( res.units );
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
