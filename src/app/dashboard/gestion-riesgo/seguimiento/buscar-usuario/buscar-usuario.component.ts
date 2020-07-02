import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { PatientService, ContactService, UserService } from 'src/app/services/service.index';

// Models
import { Contact, Patient } from 'src/app/models/model.index';

@Component({
	selector: 'app-buscar-usuario',
	templateUrl: './buscar-usuario.component.html',
	styles: [],
	providers: [
		ContactService,
		PatientService,
		UserService,
	]
})
export class BuscarUsuarioComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public adminFlag: boolean;
	public actualPage: number;
	public itemsPerPage: number;
	public samplesTitle: boolean;

	public token: string;
	public identity: any;
	public chain: string;
	public contacts: any;
	public patients: Patient[];
	public patientSelectedId: any;
	public selectedPatient: any;

	constructor(
		private _patientService: PatientService,
		private _contactService: ContactService,
		private _userService: UserService,
		private _router: Router,
	) {
		this.itemsPerPage = 20;

		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
	}

	ngOnInit(): void {
		this.adminFlag = (this.identity.role=='ADMIN_ROLE' || this.identity.role=='ADMIN_GESTION_RIESGO_ROLE') ? true:false;

		if( localStorage.getItem('chain') ) this.getPatientLocalStorage();
	}

	search(){
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;
		this.patients = undefined;
		this.selectedPatient = undefined;
		this.contacts = undefined;

		this._patientService.getPatientByChain( this.chain, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if( res.status == 'success' ){
					this.patients = res.patients;
				}
			},
			error => {
				this.preloaderStatus = false;
				this.status = 'error';
				this.responseMessage = error.error.message;
				console.log(<any>error);
			}
		);
	}

	setSelectedPatient(){
		this.preloaderStatus = true;
		this.selectedPatient = undefined;

		for(let i = 0; i < this.patients.length; i++){
			if(this.patients[i].id === +this.patientSelectedId){
				this.selectedPatient = this.patients[i];
				this.preloaderStatus = false;
				this.searchContacts(this.selectedPatient.id);
				break;
			}
		}
	}

	searchContacts(id){
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;
		this.contacts = undefined;

		this._contactService.getContactByCasoIndice( id, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if( res.status == 'success' ){
					if( res.contacts.length > 0){
						this.contacts = res.contacts;
					} else {
						this.status = 'error';
						this.responseMessage = 'No existen contactos asociados al paciente índice con número de documento ' + this.selectedPatient.documento;
					}
				}
			},
			error => {
				this.preloaderStatus = false;
				this.status = 'error';
				this.responseMessage = error.error.message;
				console.log(<any>error);
			}
		);
	}

	getPatientLocalStorage(){
		this.chain = localStorage.getItem('chain');
		this.patients = JSON.parse(localStorage.getItem('patients'));
		this.patientSelectedId = localStorage.getItem('patientSelectedId'); 
		this.setSelectedPatient();
	}

	patientLocalStorage(patientId){
		localStorage.setItem('chain', this.chain);
		localStorage.setItem('patients', JSON.stringify(this.patients));
		localStorage.setItem('patientSelectedId', this.patientSelectedId);
		this._router.navigate(['/gestion-riesgo/seguimientos/registrar/'+patientId]);
	}

	setButtonText(count){
		if(count > 0) return 'Seguimiento realizado';
		else return 'Realizar seguimiento';
	}

	deleteContact(id){
		console.log(id);
	}

	setTitle(resp :boolean){
		this.samplesTitle = resp;
	}

    pageChange(event){
		localStorage.setItem('samplesPage', event);
		this.actualPage = event;
    }
}
