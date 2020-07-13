import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

// Services
import { UserService, MassiveService } from 'src/app/services/service.index';

// Models
import { Patient, Caso } from 'src/app/models/model.index';

@Component({
	selector: 'app-masiva-caracterizacion',
	templateUrl: './masiva-caracterizacion.component.html',
	styles: [],
	providers: [
		UserService,
		MassiveService,
	]
})
export class MasivaCaracterizacionComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public registerMessage: string;
	public preloaderRegisterMessage: boolean;
	public actualPage: number;
	public itemsPerPage: number;
	public token: string;

	public successes: string;
	public errorArray: string;

	public patients: any;
	public cases: any;
	public faSpinner = faSpinner;
	public file: File;	

	constructor(
		private _userService: UserService,
		private _massiveService: MassiveService,
	) {
		this.actualPage = 1;
		this.itemsPerPage = 40;

		this.token = this._userService.getToken();
	}

	ngOnInit(): void {
	}

	// registerMassive(){
	// 	this.preloader2Status = true;
	// 	this.successesMessage = undefined;
	// 	this.errorLoadMessage = undefined;

	// 	this._userService.newMassiveUser(this.users, this.token).subscribe(
	// 		response => {
	// 			this.preloader2Status = false;
	// 			if(response.status == 'success'){
	// 				this.successesMessage = 'Se han guardado correctamente ' + response.successes + ' usuarios';
	// 				if(+response.errors != 0) {
	// 					this.errorLoadMessage = 'No se han podido guardar ' + response.errors + ' usuarios. ' + response.errorsMessage;
	// 				}
	// 			}
	// 		},
	// 		error => {
	// 			this.preloader2Status = false;
	// 			this.errorLoadMessage = 'Ha ocurrido un error al intentar guardar los usuarios importados';
	// 		}
	// 	);
	// }

	registerMassive(){
		this.preloaderRegisterMessage = true;
		this.registerMessage = undefined;
		this.successes = undefined;
		this.errorArray = undefined;

		this.patients.forEach( element => {
			this.validateValues(element);
		});

		this._massiveService.massivePatientCaseStore( this.patients, this.token ).subscribe(
			res => {
				this.preloaderRegisterMessage = false;
				if( res.status == 'success' ){
					this.successes = res.successes;
					this.errorArray = res.errorArray;
					console.log(this.errorArray);
				}
			},
			error => {
				this.preloaderRegisterMessage = false;
				this.registerMessage = 'Ha ocurrido un error al intentar hacer el cargue masivo de pacientes en el sistema';
				console.log(<any>error);
			}
		);
	}

	addFile(event){
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;
		this.patients = undefined;
		this.cases = undefined;

		this.file = event.target.files[0];
		let fileReader = new FileReader();
		fileReader.readAsArrayBuffer(this.file);
		fileReader.onload = (element) => {
			let arrayBuffer: any;
			arrayBuffer = fileReader.result;
			var data = new Uint8Array( arrayBuffer );
			var arr = new Array();
			for(var i=0; i!=data.length; i++){
				arr[i] = String.fromCharCode(data[i]);
			}
			var bstr = arr.join("");
			var workbook = XLSX.read(bstr, {type: "binary"});
			var first_sheet_name = workbook.SheetNames[0];
			var worksheet = workbook.Sheets[first_sheet_name];
			let arrayData = XLSX.utils.sheet_to_json(worksheet, {raw: true});
			let documentHeader = this.getKeys(arrayData[0]);
			let flag = false;

			documentHeader.forEach(element => {
				if(element.key == 'documento' || element.key == 'tipoDocumento' ||
				   element.key == 'primerNombre' || element.key == 'segundoNombre' ||
				   element.key == 'primerApellido' || element.key == 'segundoApellido' ||
				   element.key == 'edad' || element.key == 'unidadMedida' ||
				   element.key == 'grupoEdad' || element.key == 'sexo' ||
				   element.key == 'pertenenciaEtnica' || element.key == 'grupoEtnico' ||
				   element.key == 'grupoPoblacional' || element.key == 'semanasGestacion' ||
				   element.key == 'direccion' || element.key == 'barrio' ||
				   element.key == 'nacionalidad' || element.key == 'telefono' ||
				   element.key == 'otroTelefono' || element.key == 'insurers_id' ||
				   element.key == 'ocupacion' || element.key == 'tipoRegimen' ||
				   element.key == 'clasificacionCaso' || element.key == 'fechaRadicado' ||
				   element.key == 'numeroRadicado' || element.key == 'fechaNotificacion' ||
				   element.key == 'UPGD_id' || element.key == 'fuenteNotificacion' ||
				   element.key == 'fechaConsultaPersona' || element.key == 'evento' ||
				   element.key == 'fechaHospitalizacion' || element.key == 'asignacionProfesional' ||
				   element.key == 'fechaProfesional' || element.key == 'asignacionAuxiliar' ||
				   element.key == 'fechaAuxiliar' || element.key == 'IEC' ||
				   element.key == 'fechaIEC' || element.key == 'condicionIEC' ||
				   element.key == 'observacionIEC' || element.key == 'antecedenteViaje' ||
				   element.key == 'lugarViaje' || element.key == 'fuenteContagio' ||
				   element.key == 'estadoPersona' || element.key == 'estadoFinal'){
					flag = true;
				} else {
					flag = false;
				}
			});

			if(flag){
				this.preloaderStatus = false;
				this.patients = arrayData;
			} else {
				this.preloaderStatus = false;
				this.status = 'error';
				this.responseMessage = 'Debe cargar el archivo con los índices correctos';

			}
		}
	}

	getKeys(obj){
		return Object.keys(obj).map( x => {
			return {
				key: x,
				value: obj[x]
			}
		});
	}

	validateValues( info ){
		if(info.segundoNombre || info.segundoNombre == 'NULL' ) info.segundoNombre = null;
		if(info.segundoApellido || info.segundoApellido == 'NULL' ) info.segundoApellido = null;
		if(info.pertenenciaEtnica != 1 )info.grupoEtnico = null;
		if(info.grupoPoblacional != 3 )info.semanasGestacion = null;
		if(info.evento != 3 )info.fechaHospitalizacion = null;
		if(info.IEC == 2 ){
			info.fechaIEC = null;
			info.condicionIEC = null;
			info.observacionIEC = null;
		}
		if(info.condicionIEC == 2 )info.observacionIEC = null;
		if(info.antecedenteViaje == 2 )info.lugarViaje = null;
		if(info.otroTelefono || info.otroTelefono == 'NULL' ) info.otroTelefono = null;
		if(info.UPZ_id || info.UPZ_id == 'NULL' ) info.UPZ_id = null;
	}

	jsontostring(error){
		return JSON.stringify(error);
	}

	pageChange(event){
		this.actualPage = event;
	}
}
