import { Component, OnInit } from '@angular/core';
import { CollaboratorsService, ExportService } from '../../../../services/service.index';
import { global, UserService } from '../../../../services/service.index';

import { Collaborators } from '../../../../models/model.index';

@Component({
	selector: 'app-listar-colaboradores',
	templateUrl: './listar-colaboradores.component.html',
	styles: [],
	providers: [
		CollaboratorsService,
		ExportService,
		UserService
	]
})
export class ListarColaboradoresComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public actualPage: number;
	public itemsPerPage: number;
	public chain: string;
	public searchResponseMessage: string;
	public searchLoaderStatus: boolean;

	public collaborators: Collaborators[];
	public token: string;

	constructor(
		private _collaboratorService: CollaboratorsService,
		private _exportService: ExportService,
		private _userService: UserService
	) {
		this.token = this._userService.getToken();
		let page = +localStorage.getItem( 'collaboratorPage' );
		if( page ) this.actualPage = page;
		else this.actualPage = 1;
		this.itemsPerPage = 20;
	}

	ngOnInit(): void {
		this.getCollaborators();
	}

	getCollaborators(){	
		this.searchLoaderStatus = true;
		this.searchResponseMessage = undefined;

		this._collaboratorService.getCollaborators(this.token).subscribe(
			response => {
				this.searchLoaderStatus = false;
				if(response.status == 'success'){
					this.collaborators = response.collaborators;
				}
			},
			error => {
				this.searchLoaderStatus = false;
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log(<any> error);
			}
		);
	}

	searchText(){
		this.searchLoaderStatus = true;
		this.searchResponseMessage = undefined;

		this._collaboratorService.getCollaboratorsByChain( this.chain, this.token ).subscribe(
			res => {
				this.searchLoaderStatus = false;
				if( res.status == 'success' ){
					this.collaborators = res.collaborators;
				}
			},
			error => {
				this.searchLoaderStatus = false;
				this.searchResponseMessage = error.error.message;
				console.log(<any>error);
			}
		);
	}

	exportAsXLSX(){
		let infoToExcelExport:any = undefined;
		infoToExcelExport = this.collaborators;
		let names: any = {};
		names.id = 'ID';
		names.nombre = 'NOMBRES Y APELLIDOS';
		names.tipoDocumento = 'TIPO DE DOCUMENTO';
		names.documento = 'NÚMERO DE DOCUMENTO';
		names.sexo = 'SEXO';
		names.edad = 'EDAD';
		names.telefono = 'TELEFONO';
		names.arl = 'ARL';
		names.aseguradora = 'ASEGURADORA';
		names.direccion = 'DIRECCIÓN';
		names.perfil = 'PERFIL';
		names.vinculacion = 'VINCULACIÓN';
		names.area = 'AREA';
		names.unidad = 'UNIDAD';
		names.fechaIngreso = 'FECHA DE INGRESO';
		names.fechaEgreso = 'FECHA DE EGRESO';
		names.fechaSintomas = 'FECHA DE INICIO DE SÍNTOMAS';
		names.fiebre = 'FIEBRE';
		names.malestarGeneral = 'MALESTAR GENERAL';
		names.disnea = 'DISNEA';
		names.odinia = 'ODINIA';
		names.gastrointestinales = 'GASTROINTESTINALES';
		names.estornudo = 'ESTORNUDOS/FLUJO NASAL';
		names.mialgias = 'MIALGIAS';
		names.riesgoEndogeno = 'FACTORES DE RIESGO ENDÓGENOS';
		names.riesgoExogeno = 'FACTORES DE RIESGO EXÓGENOS';
		names.factoresExposicion = 'FACTORES COMUNES DE EXPOSICIÓN';
		names.manejo = 'MANEJO';
		names.remitido = 'REMITIDO';
		names.fechaTomaMuestra = 'FECHA DE TOMA DE MUESTRA';
		names.fechaResultado = 'FECHA DE RESULTADO';
		names.diasTranscurridos = 'DÍAS TRANSCURRIDOS';
		names.contagiado = 'CONTAGIADO';
		names.nexo = 'NEXOS';
		names.primerSeguimiento = 'FECHA DEL PRIMER SEGUIMIENTO';
		names.nombrePrimerSeguimiento = 'NOMBRE DE QUIEN REALIZÓ EL PRIMER SEGUIMIENTO';
		names.segundoSeguimiento = 'FECHA DEL SEGUNDO SEGUIMIENTO';
		names.nombreSegundoSeguimiento = 'NOMBRE DE QUIEN REALIZÓ EL SEGUNDO SEGUIMIENTO';
		names.estado = 'ESTADO';
		names.trabajo = 'TRABAJÓ';
		names.fechaSegundaPrueba = 'FECHA DE LA SIGUIENTE PRUEBA';
		names.observaciones = 'OBSERVACIONES';

		infoToExcelExport.forEach(element => {
			element.tipoDocumento = this.setName('tipoDocumento', element.tipoDocumento);
			element.sexo = this.setName('sexo', element.sexo);
			if( element.arl ) element.arl = element.arl.name;
			if( element.aseguradora ) element.aseguradora = element.aseguradora.name;
			if( element.perfil ) element.perfil = element.perfil.name;
			element.vinculacion = this.setName('tipoVinculacion', element.vinculacion);
			if( element.area ) element.area = element.area.name;
			if( element.unidad ) element.unidad = element.unidad.name;
			element.fiebre = this.setName('respuestas', element.fiebre);
			element.malestarGeneral = this.setName('respuestas', element.malestarGeneral);
			element.disnea = this.setName('respuestas', element.disnea);
			element.odinia = this.setName('respuestas', element.odinia);
			element.gastrointestinales = this.setName('respuestas', element.gastrointestinales);
			element.estornudo = this.setName('respuestas', element.estornudo);
			element.mialgias = this.setName('respuestas', element.mialgias);
			element.manejo = this.setName('manejos', element.manejo);
			element.contagiado = this.setName('respuestas', element.contagiado);
			element.nexo = this.setName('nexos', element.nexo);
			element.estado = this.setName('estados', element.estado);
			element.trabajo = this.setName('respuestas', element.trabajo);
		});

		infoToExcelExport.unshift(names);

		this._exportService.exportToExcelPlans(infoToExcelExport, 'Reporte Seguimientos Colaboradores_');
	}

	setName(key, id){
		let name = '';
		global[key].forEach(element => {
			if(element.id == id) name = element.value ? element.value:element.name;
		});
		return name;
	}

	pageChange(event){
		this.actualPage = event;
		localStorage.setItem( 'collaboratorPage', event );
	}
}
