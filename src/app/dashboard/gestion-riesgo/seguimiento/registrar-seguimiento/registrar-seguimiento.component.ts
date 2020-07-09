import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert';

// Services
import { ContactService, global, PatientService, UserService, FollowService } from 'src/app/services/service.index';

// Models
import { Follow, Patient } from 'src/app/models/model.index';

@Component({
	selector: 'app-registrar-seguimiento',
	templateUrl: './registrar-seguimiento.component.html',
	styles: [],
	providers: [
		ContactService,
		FollowService,
		PatientService,
		UserService,
	]
})
export class RegistrarSeguimientoComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public buttonText: string;
	public chain: any;
	public patientId: number;
	public actualDate: string;
	public currentTime: string;
	public alertCurrentFollowMessage: string;
	public load: boolean;
	public openIndices: boolean;
	
	public token: string;
	public follow: Follow;
	public patients: Patient[];
	public patientSelectedId: number;
	public selectedPatient: any;

	public condiciones: Array<any>;
	public tiposSeguimiento: Array<any>;
	public respuestas: Array<any>;
	public estadosFinal: Array<any>;
	public estadosPaciente: Array<any>;
	public today = new Date();

	constructor(
		private _contactService: ContactService,
		private _followService: FollowService,
		private _patientService: PatientService,
		private _userService: UserService,
		private _router: Router,
		private _route: ActivatedRoute,
	) {
		this.buttonText = 'Registrar Seguimiento';
		this.actualDate = this.setMaxDate();
		this.currentTime = this.setCurrentTime();
		this.load = false;
		
		this.token = this._userService.getToken();

		this.condiciones = global.condiciones;
		this.tiposSeguimiento = global.tiposSeguimiento;
		this.respuestas = global.respuestas;
		this.estadosFinal = global.estadosFinal;
		this.estadosPaciente = global.estadoPaciente;
	}

	ngOnInit(): void {
		this._route.params.subscribe(params => {
			this.status = undefined;
			this.responseMessage = undefined;
			this.patientId = undefined;
			this.patients = undefined;
			this.selectedPatient = undefined;
			this.follow = new Follow(null,null,null,null,this.actualDate,this.currentTime,null,null,false,null,false,false,false,false,false,false,false,false,null,null,1);

			let patientId = params['patientId'];

			if(patientId){
				this.patientId = patientId;
				this.follow.patient_id = patientId;
				this.search();
			} else {
				this.load = true;
			}
		})
	}
	
	search(){
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;
		this.patients = undefined;
		this.openIndices = false;
		
		this.chain = this.patientId ? this.patientId : this.chain;
		
		this._patientService.getPatientByChain( this.chain, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if( res.status == 'success' ){
					let id = null;
					this.patients = res.patients;
					if(this.patientId) {
						this.patientSelectedId = this.patientId;
						this.setSelectedPatient();
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

	setSelectedPatient(){
		this.preloaderStatus = true;
		this.selectedPatient = undefined;

		for(let i = 0; i < this.patients.length; i++){
			if(this.patients[i].id === +this.patientSelectedId){
				this.selectedPatient = this.patients[i];
				this.alertCurrentFollowMessage = this.selectedPatient.current_follow_count > 0 ? 'Ya se ha registrado el seguimiento del paciente el día de hoy' : undefined;
				this.chain = this.patientId ? this.selectedPatient.documento:this.chain;
				this.follow.patient_id = this.selectedPatient.id;
				break;
			}
		}
		this.getMyOpenIndiceCases(this.selectedPatient.id);
		this.preloaderStatus = false;
		this.load = true;
	}

	getMyOpenIndiceCases(id){		
		this._contactService.getMyIndiceCases( id, this.token ).subscribe(
			res => {
				if( res.status == 'success' ){
					if( res.contacts.length > 0 ){
						this.openIndices = true;
					}
				}
			},
			error => {
				this.openIndices = true;
			}
		);
	}

	onSubmit(registerFollowForm){
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this._followService.newFollow( this.follow, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if( res.status == 'success' ){
					this.responseMessage = res.message;
					swal('Registro creado correctamente', this.responseMessage, 'success');
					if( this.patientId ){
						this._router.navigate(['/gestion-riesgo/seguimientos/buscar-usuario']);
					}
					this.follow.horaSeguimiento = this.setCurrentTime();
					registerFollowForm.reset();
					this.search();
				}
			},
			error => {				
				this.preloaderStatus = false;
				this.status = error.error.status;
				this.responseMessage = error.error.message;

				if(error.error.errors){
					this.responseMessage = JSON.stringify(error.error.errors);
				}

				swal('Error', this.responseMessage, 'error');
				console.log(<any>error);
			}
		);
	}

	setNull(){
		if( this.follow.tipoSeguimiento == 2 ){
			this.follow.condicion = null;
			this.follow.asintomatico = null;
			this.follow.estadoPaciente = null;
			this.follow.estadoFinal = null;
			this.setSymptomsNull();
			return;
		}
		if( this.follow.condicion == 3 ){
			this.follow.asintomatico = null;
			this.follow.estadoPaciente = null;
			this.follow.estadoFinal = null;
			this.setSymptomsNull();
			return;
		}
		
	}

	cambiarEstado(){
		this.follow.estadoPaciente = this.follow.asintomatico == 1 ? 1:2;
		if( this.follow.asintomatico == 1 ){
			this.setSymptomsNull();
		}
	}

	setSymptomsNull(){
		this.follow.fiebre = null;
		this.follow.valorFiebre = null;
		this.follow.tos = null;
		this.follow.cefalea = null;
		this.follow.dificultadRespiratoria = null;
		this.follow.odinofagia = null;
		this.follow.diarrea = null;
		this.follow.vomito = null;
		this.follow.fatiga = null;
		this.follow.otroSintoma = null;
		this.follow.valorOtroSintoma = null;
	}

	setMaxDate(){
		let date = new Date();
		let day = this.addZero( date.getDate() );
		let month = date.getMonth()+1;
		month = this.addZero( month );
		let year = date.getFullYear();
		return year+'-'+month+'-'+day;
	}

	setCurrentTime(){
		let date = new Date();
		let hour = this.addZero( date.getHours() );
		let minutes = this.addZero( date.getMinutes() );
		return hour+':'+minutes;
	}

	addZero(number){
		if( number < 10 ){
			number = '0' + number.toString();
		}
		return number;
	}
	
	upperCase($event){
		if($event) return $event.toUpperCase();
		else return null;
	}
}
