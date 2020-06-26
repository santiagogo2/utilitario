import { Component, OnInit } from '@angular/core';

// Services
import { EppTrackingService, ExportService, UserService, global } from '../../../services/service.index';

// Models
import { EppTracking } from '../../../models/model.index';

@Component({
	selector: 'app-listar-seguimiento-epp',
	templateUrl: './listar-seguimiento-epp.component.html',
	styles: [],
	providers: [
		EppTrackingService,
		ExportService,
		UserService,
	]
})
export class ListarSeguimientoEppComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public actualPage: number;
	public itemsPerPage: number;
	public adminFlag: boolean;

	public token: string;
	public identity: any;
	public epptracking: EppTracking[];

	constructor(
		private _eppTrackingService: EppTrackingService,
		private _exportService: ExportService,
		private _userService: UserService,
	) {		
		let eppTrackingPage = +localStorage.getItem( 'eppTrackingPage' );
		this.actualPage = eppTrackingPage ? eppTrackingPage : 1;
		this.itemsPerPage = 40;

		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
	}

	ngOnInit(): void {
		this.status = undefined;
		this.responseMessage = undefined;
		this.eppTrackingList();
		this.adminFlag = (this.identity.role=='ADMIN_ROLE' || this.identity.role=='ADMIN_EPP_ROLE') ? true:false;
	}

	eppTrackingList(){
		this._eppTrackingService.eppTrackingList( this.token ).subscribe(
			res => {
				if( res.status == 'success' ){
					this.epptracking = res.epptracking;
					// this.exportAsXLSX(this.epptracking);
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log(<any> error);
			}
		);
	}

	deleteEppTracking(id){
		this.status = undefined;
		this.responseMessage = undefined;
		let loader = document.getElementById('loader'+id);
		loader.style.display = 'block';
		
		this._eppTrackingService.deleteEppTracking(id, this.token).subscribe(
			res => {
				loader.style.display = 'none';
				if( res.status == 'success' ){
					this.status = res.status;
					this.responseMessage = res.message;
					this.eppTrackingList();
				}
			},
			error => {
				loader.style.display = 'none';
				document.body.animate([{scrollTop:0}], {duration: 1000});
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log(<any>error);
			}
		);
	}

	setName(key, id){
		let name = '';
		global[key].forEach(element => {
			if(element.id === id) name = element.name;
		});
		return name;
	}

	pageChange(event){
		this.actualPage = event;
	}

	exportAsXLSX(){
		let infoToExcelExport:any = this.epptracking;
		let names: any = {};
		names.id = 'ID';
		names.fecha = 'FECHA';
		names.nombre = 'NOMBRE COMPLETO';
		names.documento = 'NÚMERO DE DOCUMENTO';
		names.profiles = 'PERFIL';
		names.services_id = 'SERVICIO';
		names.units = 'UNIDAD';
		names.epp_id = 'EPP ENTREGADO';
		names.user = 'USUARIO QUE REGISTRO EL SEGUIMIENTO';

		infoToExcelExport.forEach(element => {
			delete element.profiles_id;
			element.profiles = element.profiles.name;
			delete element.units_id;
			element.units = element.units.name;
			delete element.created_by;
			element.user = element.user.name + ' ' + element.user.surname;
			element.services_id = this.setName('services', element.services_id);
			element.epp_id = this.setName('epps', element.epp_id);
		});

		infoToExcelExport.unshift(names);

		this._exportService.exportToExcelPlans(infoToExcelExport, 'Reporte Seguimientos EPP_');
	}
}
