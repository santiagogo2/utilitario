import { Component, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';

// Services
import { global, PatientService, SampleService, UserService } from 'src/app/services/service.index';

// Models
import { Sample, Patient } from 'src/app/models/model.index';

@Component({
	selector: 'app-registrar-toma-muestras',
	templateUrl: './registrar-toma-muestras.component.html',
	styles: [],
	providers: [
		PatientService,
		SampleService,
		UserService,
	]
})
export class RegistrarTomaMuestrasComponent implements OnInit {
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
	public patientId: number;

	public token: string;
	public identity: any;
	public sample: Sample;
	public patient: Patient;

	public tomaMuestras: Array<any>;
	public resultados: Array<any>;

	constructor(
		private _patientService: PatientService,
		private _sampleService: SampleService,
		private _userService: UserService,
	) {
		this.buttonText = 'Registrar';
		this.actualDate = this.setMaxDate();
		this.showFile = false;

		this.token = this._userService.getToken();
		this.sample = new Sample(null,null,null,null,null,null,null,null);

		this.tomaMuestras = global.tomaMuestras;
		this.resultados = global.resultados;
	}

	ngOnInit(): void {
	}

	onSubmit(sampleRegisterForm){
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this._sampleService.newSample( this.sample, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if( res.status == 'success' ){
					swal('Registro exitoso', res.message, 'success');
					localStorage.removeItem('loadedDocument');
					sampleRegisterForm.reset();
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

	downloadFile(){
		this.status = undefined;
		this.responseMessage = undefined;
		let url = global.url;
		
		this._sampleService.downloadSampleDocument(this.sample.archivo, this.token).subscribe(
			res => {
				window.open(url+'documents/get-file/'+this.sample.archivo);
			},
			error => {
				this.status = 'error';
				this.responseMessage = error.error.message;
				console.log(<any>error);
			}
		);
	}

	searchPatient(){
		this.searchPreloaderStatus = true;
		this.searchResponseMessage = undefined;
		this.patient = undefined;
		
		this._patientService.getPatientByDocument( this.searchText, this.token ).subscribe(
			res => {
				this.searchPreloaderStatus = false;
				this.patient = res.patient;
				this.sample.patient_id = this.patient.id;
			},
			error => {
				this.searchPreloaderStatus = false;
				this.searchResponseMessage = error.error.message;
				console.log(<any>error);
			}
		);
	}

	setFileName(filename){
		this.sample.archivo = filename;
	}

	editFile(estado){}

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
