import { Component, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';

// Services
import { global, SampleService, UserService, CaseService } from 'src/app/services/service.index';

// Models
import { Sample } from 'src/app/models/model.index';

@Component({
	selector: 'app-editar-toma-muestras',
	templateUrl: '../registrar-toma-muestras/registrar-toma-muestras.component.html',
	styles: [],
	providers: [
		CaseService,
		SampleService,
		UserService,
	]
})
export class EditarTomaMuestrasComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public buttonText: string;
	public faSpinner = faSpinner;
	public actualDate: string;
	public showFile: boolean;
	public searchText: string;
	public searchResponseMessage: string;
	public searchPreloaderStatus: boolean;
	public previusDocument: string;

	public token: string;
	public identity: any;
	public sample: any;
	public cases: any;

	public tomaMuestras: Array<any>;
	public resultados: Array<any>;

	constructor(
		private _caseService: CaseService,
		private _sampleService: SampleService,
		private _userService: UserService,
		private _router: Router,
		private _route: ActivatedRoute,
	) {
		this.buttonText = 'Actualizar';
		this.actualDate = this.setMaxDate();

		this.token = this._userService.getToken();

		this.tomaMuestras = global.tomaMuestras;
		this.resultados = global.resultados;
	}

	ngOnInit(): void {
		this._route.params.subscribe( params => {
			this.status = undefined;
			this.responseMessage = undefined;
			this.sample = undefined;
			this.cases = [];

			let id = +params['id'];

			this.getSample(id);
		});
	}

	onSubmit(sampleEditForm){
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;
		delete this.sample.grcases;

		this._sampleService.updateSample( this.sample, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if( res.status == 'success' ){
					swal('Registro actualizado exitosamente', res.message, 'success');
					localStorage.removeItem('loadedDocument');
					this._router.navigate(['/gestion-riesgo/toma-muestras']);
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

	getSample(id){
		this._sampleService.getSample(id, this.token).subscribe(
			res => {
				if( res.status == 'success' ){
					this.sample = res.sample;
					this.showFile = this.sample.archivo ? true:false;
					this.cases.push(this.sample.grcases);
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log(<any>error);
			}
		);
	}

	searchCases(){
		this.searchPreloaderStatus = true;
		this.searchResponseMessage = undefined;
		this.cases = undefined;
		
		this._caseService.searchCases( this.searchText, this.token ).subscribe(
			res => {
				this.searchPreloaderStatus = false;
				this.cases = res.grcases;
			},
			error => {
				this.searchPreloaderStatus = false;
				this.searchResponseMessage = error.error.message;
				console.log(<any>error);
			}
		);
	}

	downloadFile(){
		this.status = undefined;
		this.responseMessage = undefined;
		let url = global.url;
		console.log('entre');
		
		this._sampleService.downloadSampleDocument(this.sample.archivo, this.token).subscribe(
			res => {
				window.open(url+'sample/get-file/'+this.sample.archivo);
			},
			error => {
				this.status = 'error';
				this.responseMessage = error.error.message;
				console.log(<any>error);
			}
		);
	}

	setFileName(filename){
		this.sample.archivo = filename;
	}

	editFile(estado){
		if(estado == 'cancelar'){			
			this.sample.archivo = this.previusDocument;
			this.previusDocument = null;
			this.showFile = true;
		}
		if(estado == 'editar'){
			this.previusDocument = this.sample.archivo;
			this.showFile = false;
		}
	}

	deleteFile(loadedDocument){
		this._sampleService.deleteFile( loadedDocument, this.token ).subscribe();
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
}
