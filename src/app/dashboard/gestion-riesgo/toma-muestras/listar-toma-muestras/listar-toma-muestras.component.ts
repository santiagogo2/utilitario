import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Services
import { SampleService, UserService } from 'src/app/services/service.index';

// Models
import { Sample } from 'src/app/models/model.index';

@Component({
	selector: 'app-listar-toma-muestras',
	templateUrl: './listar-toma-muestras.component.html',
	styles: [],
	providers: [
		SampleService,
		UserService,
	]
})
export class ListarTomaMuestrasComponent implements OnInit {
	@Input() public patientId: number;
	@Input() public disableButton: number;
	@Output() public setTitle: EventEmitter<any> = new EventEmitter;
	public status: string;
	public responseMessage: string;
	public actualPage: number;
	public itemsPerPage: number;
	public adminFlag: boolean;
	public chain: string;
	public searchLoaderStatus: boolean;
	public searchResponseMessage: string;
	public isDate: boolean;

	public token: string;
	public identity: any;
	public samples: Sample[];

	constructor(
		private _sampleService: SampleService,
		private _userService: UserService,
	) {
		let samplesPage = +localStorage.getItem( 'samplesPage' );
		this.actualPage = samplesPage ? samplesPage : 1;
		this.itemsPerPage = 40;

		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
	}

	ngOnInit(): void {
		if( this.patientId ){
			this.samples = undefined;
			this.getSamplesByPatient();
		} else {
			this.samplesList();
		}
		this.adminFlag = (this.identity.role=='ADMIN_ROLE' || this.identity.role=='ADMIN_GESTION_RIESGO_ROLE') ? true:false;
	}

	samplesList(){
		this.searchLoaderStatus = true;
		this.searchResponseMessage = undefined;
		this._sampleService.samplesList( this.token ).subscribe(
			res => {
				this.searchLoaderStatus= false;
				if( res.status == 'success' ){
					this.samples = res.samples;
				}
			},
			error => {
				this.searchLoaderStatus= false;
 				this.status = 'error';
				this.responseMessage = error.error.message;
				console.log( <any>error );
			}
		);
	}

	getSamplesByPatient(){
		this._sampleService.getSamplesByPatient( this.patientId, this.token ).subscribe(
			res => {
				if( res.status == 'success' ){
					this.samples = res.samples;
					this.setTitle.emit(true);
				}
			},
			error => {
 				this.status = 'error';
				this.responseMessage = error.error.message;
				this.setTitle.emit(false);
				console.log( <any>error );
			}
		);
	}

	validateNull(val){
		return val ? val : '';
	}

	deleteSample(id){
		this.status = undefined;
		this.responseMessage = undefined;
		let loader = document.getElementById('loader'+id);
		loader.style.display = 'block';
		
		this._sampleService.deleteSample(id, this.token).subscribe(
			res => {
				loader.style.display = 'none';
				if( res.status == 'success' ){
					this.status = res.status;
					this.responseMessage = res.message;
					this.samplesList();
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
	
	searchText(){
		this.searchResponseMessage = undefined;
		this.searchLoaderStatus = true;

		this._sampleService.getSamplesByChain( this.chain, this.token ).subscribe(
			res => {
				this.searchLoaderStatus = false;
				if( res.status == 'success' ){
					this.samples = res.samples;
					console.log(this.samples);
				}
			},
			error => {
				this.searchLoaderStatus = false;
				this.searchResponseMessage = error.error.message;
				console.log(<any>error);
			}
		)
	}

    pageChange(event){
		localStorage.setItem('samplesPage', event);
		this.actualPage = event;
    }
}
