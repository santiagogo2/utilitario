import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { PatientService, UserService } from '../../../../services/service.index';

// Models
import { Patient, User } from '../../../../models/model.index';

@Component({
	selector: 'app-listar-caracterizacion',
	templateUrl: './listar-caracterizacion.component.html',
	styles: [],
	providers: [
		PatientService,
		UserService,
	]
})
export class ListarCaracterizacionComponent implements OnInit {
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
	public patients: any;
	public users: User[];

	constructor(
		private _patientService: PatientService,
		private _userService: UserService,
		private _router: Router,
	) {
		localStorage.removeItem('editPatientDocument');
		let patientsPage = +localStorage.getItem( 'patientsPage' );
		this.actualPage = patientsPage ? patientsPage : 1;
		this.itemsPerPage = 40;

		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
	}

	ngOnInit(): void {
		this.status = undefined;
		this.responseMessage = undefined;
		this.patients = undefined;
		this.adminFlag = (this.identity.role=='ADMIN_ROLE' || this.identity.role=='ADMIN_GESTION_RIESGO_ROLE') ? true:false;
		this.usersList();
		this.patientsList();
	}

	getMyPatients(){
		this.searchLoaderStatus = true;
		this.searchResponseMessage = undefined;

		this._patientService.getMyPatients( this.token ).subscribe(
			res => {
				this.searchLoaderStatus = false;
				if( res.status == 'success' ){
					this.patients = res.patients;
				}
			},
			error => {
				this.searchLoaderStatus = false;
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log( <any> error );
			}
		);
	}

	usersList(){
		this._userService.userList( this.token ).subscribe(
			res => {
				if( res.status == 'success' ){
					this.users = res.users;
				}
			},
			error => {
				this.searchLoaderStatus = false;
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log( <any> error );
			}
		);
	}

	patientsList(){
		this.searchLoaderStatus = true;
		this.searchResponseMessage = undefined;

		this._patientService.patientsList( this.token ).subscribe(
			res => {
				this.searchLoaderStatus = false;
				if( res.status == 'success' ){
					this.patients = res.patients;
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log( <any> error );
			}
		);
	}

	getPatientForListByChain(){
		this.searchLoaderStatus = true;
		this.searchResponseMessage = undefined;

		this._patientService.getPatientForListByChain( this.chain, this.token ).subscribe(
			res => {
				this.searchLoaderStatus = false;
				if( res.status == 'success' ){
					this.patients = res.patients;
				}
			},
			error => {
				this.searchLoaderStatus = false;
				this.searchResponseMessage = error.error.message;
				console.log( <any> error );
			}
		);		
	}

	deletePatient(id){}

	isIndice(caso){
		if(caso) return 'SI';
		return 'NO';
	}

	setProfesional(profesionalId){
		console.log(profesionalId);
		for(let i = 0; i < this.users.length; i++){
			if( this.users[i].id == profesionalId ){
				return this.users[i].name + ' ' + this.users[i].surname;
			}
		}
	}

	setLocalStorageToRedirect(documento){
		localStorage.setItem('editPatientDocument', documento);
		this._router.navigate(['/gestion-riesgo/caracterizacion-pacientes']);
	}

    pageChange(event){
		localStorage.setItem('patientsPage', event);
		this.actualPage = event;
    }
}
