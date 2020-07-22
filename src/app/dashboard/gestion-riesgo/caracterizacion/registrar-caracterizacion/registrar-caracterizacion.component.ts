import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import swal from 'sweetalert';

// Service
import { global, PatientService, UserService, ContactService, CaseService } from '../../../../services/service.index';

// Models
import { Patient, Contact, Caso } from '../../../../models/model.index';

@Component({
	selector: 'app-registrar-caracterizacion',
	templateUrl: './registrar-caracterizacion.component.html',
	styles: [],
	providers: [
		CaseService,
		ContactService,
		PatientService,
		UserService,
	]
})
export class RegistrarCaracterizacionComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public buttonText: string;
	public idPatient: string;
	public esContacto: number;
	public loadedInfo: boolean;
	public documento: number;

	public token: string;
	public patient: Patient;
	public patientForm: FormGroup;
	public contactForm: FormGroup;
	public caso: Caso;
	public caseForm: FormGroup;

	public tipoCaso: number;
	public tipoCasos: Array<any>;
	public respuestas: Array<any>;

	constructor(
		private _caseService: CaseService,
		private _contactService: ContactService,
		private _patientService: PatientService,
		private _userService: UserService,
		private _router: Router,
	) {
		this.buttonText = 'Registrar';
		this.esContacto = 2;

		this.token = this._userService.getToken();
		this.patient = new Patient(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
		this.caso = undefined;

		this.tipoCasos = global.tipoCasos;
		this.respuestas = global.respuestas;
	}

	ngOnInit(): void {
		let documento = +localStorage.getItem( 'editPatientDocument' );
		this.documento = documento ? documento:undefined;
	}

	onSubmit(form){
		// Paciente
		let formValue = this.patientForm.value;
		let patient: Patient = new Patient(null,formValue.documento,formValue.tipoDocumento,formValue.primerNombre,formValue.segundoNombre,
										   formValue.primerApellido,formValue.segundoApellido, formValue.edad, formValue.unidadMedida,
										   formValue.grupoEdad, formValue.sexo, formValue.pertenenciaEtnica, formValue.grupoEtnico,
										   formValue.grupoPoblacional, formValue.semanasGestacion, formValue.direccion, formValue.barrio,
										   formValue.upz, formValue.nacionalidad, formValue.telefono, formValue.otroTelefono, formValue.insurer,
										   formValue.ocupacion, formValue.tipoRegimen);

		patient.documento = this.documento ? this.documento:patient.documento;
		if(this.idPatient){
			patient.id = +this.idPatient;
			this.updatePatient(patient);
		} else {
			this.newPatient(patient);
		}
	}

	newPatient(patient){
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this._patientService.newPatient( patient, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if( res.status == 'success' ){
					console.log('Creó un nuevo paciente');
					this.responseMessage = res.message;
					if(this.tipoCaso == 1) this.newCase(res.patient.id);
					if(this.tipoCaso == 2) this.newContact(res.patient.id);
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

	newCase(patientId){
		this.status = undefined;
		this.preloaderStatus = true;
		let caseValue = this.caseForm.value;
		let caso: Caso = new Caso(null, patientId, caseValue.clasificacionCaso, caseValue.fechaRadicado, caseValue.numeroRadicado,
			caseValue.fechaNotificacion, caseValue.upgd, caseValue.fuenteNotificacion, caseValue.fechaConsultaPersona, caseValue.evento,
			caseValue.fechaHospitalizacion, caseValue.asignacionProfesional, caseValue.fechaProfesional, caseValue.asignacionAuxiliar,
			caseValue.fechaAuxiliar, caseValue.searchIEC, caseValue.fechaIEC, caseValue.condicionIEC, caseValue.observacionIEC,
			caseValue.antecedenteViaje, caseValue.lugarViaje, caseValue.fuenteContagio, caseValue.estadoPersona, caseValue.estadoFinal,
			caseValue.archivo);

		this._caseService.newCase( caso, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if( res.status == 'success' ){
					localStorage.removeItem('caseLoadedDocument');
					console.log('Nuevo caso creado');
					this.responseMessage += ' ' + res.message;
					if( this.esContacto == 1 ){
						this.newContact(patientId);
					} else {
						swal('Registro creado correctamente', this.responseMessage, 'success');
						this.patientForm.reset();
						this.caseForm.reset();
						this.buttonText = 'Registrar';
						this.tipoCaso = undefined;
					}
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

	updatePatient(patient){
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this._patientService.updatePatient( patient, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if( res.status == 'success' ){
					console.log('Actualizó un paciente');
					this.responseMessage = res.message;
					if( this.documento && !this.caso ) {
						swal('Paciente Actualizado', this.responseMessage, 'success');
						this._router.navigate(['/gestion-riesgo/listar-pacientes']);
					}
					if(this.tipoCaso == 1 && this.caso) this.updateCase(patient.id);
					else if(this.tipoCaso == 1) this.newCase(patient.id);					
					else if(this.tipoCaso == 2) this.newContact(patient.id);
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

	updateCase(patientId){
		this.status = undefined;
		this.preloaderStatus = true;
		// Caso	
		let caseValue = this.caseForm.value;					   
		this.caso = new Caso(this.caso.id, patientId, caseValue.clasificacionCaso, caseValue.fechaRadicado, caseValue.numeroRadicado,
			caseValue.fechaNotificacion, caseValue.upgd, caseValue.fuenteNotificacion, caseValue.fechaConsultaPersona, caseValue.evento,
			caseValue.fechaHospitalizacion, caseValue.asignacionProfesional, caseValue.fechaProfesional, caseValue.asignacionAuxiliar,
			caseValue.fechaAuxiliar, caseValue.searchIEC, caseValue.fechaIEC, caseValue.condicionIEC, caseValue.observacionIEC,
			caseValue.antecedenteViaje, caseValue.lugarViaje, caseValue.fuenteContagio, caseValue.estadoPersona, caseValue.estadoFinal,
			caseValue.archivo);
	
		this._caseService.updateCase( this.caso, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if( res.status == 'success' ){
					localStorage.removeItem('caseLoadedDocument');
					console.log('Actualizó caso');
					this.responseMessage += ' ' + res.message;
					if( this.esContacto == 1 ){
						this.newContact(patientId);
					} else {
						swal('Registro creado correctamente', this.responseMessage, 'success');
						if( this.documento ) {
							this._router.navigate(['/gestion-riesgo/listar-pacientes']);
						}
						this.patientForm.reset();
						this.caseForm.reset();
						this.buttonText = 'Registrar';
						this.tipoCaso = undefined;
					}
				}
			},
			error => {
				this.preloaderStatus = false;
				this.responseMessage = undefined;
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

	newContact(patientId){
		this.preloaderStatus = true;
		let contactValue = this.contactForm.value;
		
		let contact: Contact = new Contact(null,patientId,contactValue.pacienteIndice, contactValue.ultimoContacto, contactValue.tipoContacto,
										  contactValue.vinculo, contactValue.brote, contactValue.tipoBrote);
		this.status = undefined;

		this._contactService.newContact( contact, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if( res.status == 'success' ){
					console.log('Creo nuevo contacto');
					this.responseMessage += ' ' + res.message;
					swal('Registro actualizados correctamente', this.responseMessage, 'success');
					this.patientForm.reset();
					if(this.caseForm) this.caseForm.reset();
					this.contactForm.reset();
					this.buttonText = 'Registrar';
					this.tipoCaso = undefined;
					this.esContacto = undefined;
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
				this.idPatient = patientId;
				console.log(<any>error);
			}
		);
	}

	recievePatient(patient: Patient){
		this.patient = patient;
	}
	recieveError(error){
		console.log(error);
	}
	recieveCase(caso){
		this.caso = caso;
		this.tipoCaso = 1;
	}

	setPatientForm(patientForm){
		this.patientForm = patientForm;
	}
	setCaseForm(caseForm){
		this.caseForm = caseForm;
	}
	setContactForm(contactForm){
		this.contactForm = contactForm;
	}

	updateFlag(update){
		this.idPatient = update;
		if( this.caseForm ) this.caseForm.reset();
		this.caso = undefined;
		this.tipoCaso = undefined;
		this.buttonText = update ? 'Actualizar':'Registrar';
	}

	loaded(flag){
		this.loadedInfo = flag;
	}
}
