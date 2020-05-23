import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Collaborators } from '../../../../models/model.index';
import { global } from '../../../../services/service.index';

import { UserService } from '../../../../services/service.index';
import { AreaService, CollaboratorsService } from '../../../../services/service.index';

import swal from 'sweetalert';

@Component({
	selector: 'app-colaboradores',
	templateUrl: './registrar-colaboradores.component.html',
	styles: [],
	providers: [
		AreaService,
		CollaboratorsService,
		UserService
	]
})
export class RegistrarColaboradoresComponent implements OnInit {
	public page_title: string;
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public buttonTitle: string;

	public areas: Array<any>;
	public arls: Array<any>;
	public aseguradoras: Array<any>;
	public estados: Array<any>;
	public manejos: Array<any>;
	public nexos: Array<any>;
	public perfil: Array<any>
	public respuestas: Array<any>;
	public sexo: Array<any>;
	public tipoDocumento: Array<any>;
	public tipoVinculacion: Array<any>;
	public unidades: Array<any>;

	public collaborator: Collaborators;
	public token: string;

	constructor(
		private _areaService: AreaService,
		private _userService: UserService,
		private _collaboratorService: CollaboratorsService,
		private _router: Router
	) {
		this.arls = global.arls;
		this.aseguradoras = global.aseguradoras;
		this.estados = global.estados;
		this.manejos = global.manejos;
		this.nexos = global.nexos;
		this.perfil = global.perfil;
		this.respuestas = global.respuestas;
		this.sexo = global.sexo;
		this.tipoDocumento = global.tipoDocumento;
		this.tipoVinculacion = global.tipoVinculacion;
		this.unidades = global.unidades;

		this.collaborator = new Collaborators(null,null,null,null,null,null,null,null,null,null,null,null,null,
											  null,null,null,null,null,null,null,null,null,null,null,null,null,
											  null,null,null,null,null,null,null,null,null,null,null,null,null,
											  null,null,null,null,null);
		this.token = this._userService.getToken();
		
		let documentoCargado = localStorage.getItem('utilitarioCollaboratorDocument');
		if(documentoCargado) this.collaborator.documento = +documentoCargado;
	}

	ngOnInit(): void {
		// Obtener los datos
		this.areaList();

		
		this.getDataRouter().subscribe(
			response => {
				this.buttonTitle = response.titulo;
			}
		);	
	}

	onSubmit(collaboratorsForm){
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this._collaboratorService.newRegister(this.collaborator, this.token).subscribe(
			response => {
				this.preloaderStatus = false;
				if(response.status == 'success'){
					this.status = response.status;
					this.responseMessage = response.message;
					swal('Registro exitoso', this.responseMessage, 'success');
					collaboratorsForm.reset();
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


	// Obtener todos los datos necesarios
	areaList(){
		this.status = undefined;
		this.responseMessage = undefined;

		this._areaService.areaList( this.token ).subscribe(
			res => {
				if( res.status == 'success' ){
					this.areas = res.areas
				}
			},
			error => {
				this.status = undefined;
				this.responseMessage = undefined;
				console.log(<any>error);
			}
		);
	}
}
