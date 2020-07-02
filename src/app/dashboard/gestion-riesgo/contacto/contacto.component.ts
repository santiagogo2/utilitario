import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

// Services
import { UserService, ContactService, global, PatientService } from 'src/app/services/service.index';

// Models
import { Contact, Patient } from 'src/app/models/model.index';

@Component({
	selector: 'app-contacto',
	templateUrl: './contacto.component.html',
	styles: [],
	providers: [
		ContactService,
		PatientService,
		UserService,
	]
})
export class ContactoComponent implements OnInit {
	@Input() public documento: number;
	@Output() public sendContactForm: EventEmitter<any> = new EventEmitter;

	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public patienSearchResponseMessage: string;
	public patientPreloaderStatus: boolean;
	public faSpinner = faSpinner;

	public token: string;
	public contact: Contact;
	public contactForm: FormGroup;
	public patients: Patient[];

	public respuestas: Array<any>;
	public tipoContactos: Array<any>;
	public vinculos: Array<any>;

	constructor(
		private _contactService: ContactService,
		private _patientService: PatientService,
		private _userService: UserService,
	) {
		this.token = this._userService.getToken();

		this.respuestas = global.respuestas;
		this.tipoContactos = global.tipoContactos;
		this.vinculos = global.vinculos;
	}

	ngOnInit(): void {
		this.contactForm = new FormGroup({
			parametro: new FormControl( null, [Validators.required, Validators.pattern('[0-9]+')] ),
			pacienteIndice: new FormControl( null, [Validators.required] ),
			tipoContacto: new FormControl( null, [Validators.required] ),
			vinculo: new FormControl( null, [Validators.required] ),
			brote: new FormControl( null, [Validators.required] ),
		});
		this.setObservables();
	}

	setObservables(){
		this.contactForm.valueChanges.subscribe( value => {
			this.sendContactForm.emit(this.contactForm);
		});
	}

	searchPatient(){
		if(this.contactForm.get('parametro').value == this.documento){
			this.patientPreloaderStatus = false;
			this.patienSearchResponseMessage = 'El documento del contacto y el documento del paciente índice no pueden ser iguales';
			return false;
		}
		this.patients = undefined;
		this.patientPreloaderStatus = true;
		this.patienSearchResponseMessage = undefined;

		this._patientService.getPatientByChain( this.contactForm.get('parametro').value, this.token ).subscribe(
			res => {
				this.patientPreloaderStatus = false;
				if( res.status == 'success' ){
					let patients = this.validateIndice(res.patients);
					if( patients.length > 0) this.patients = patients;
					else {
						this.patienSearchResponseMessage = 'No se ha encontrado ningún paciente indice con el parametro '+this.contactForm.get('parametro').value;
					}
					console.log(this.patients);
				}
			},
			error => {
				this.patientPreloaderStatus = false;
				this.patienSearchResponseMessage = error.error.message;
				console.log(<any>error);
			}
		);
	}

	validateIndice(patients){
		let newArray = [];
		patients.forEach(element => {
			if( element.caso_count > 0 ){
				newArray.push(element);
			}
		});
		return newArray;
	}
}
