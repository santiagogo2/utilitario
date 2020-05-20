import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';

// Services
import { ContractorService, global, UserService } from '../../../../services/service.index';

// Models
import { Contractor } from '../../../../models/model.index';

@Component({
	selector: 'app-registrar-contratistas',
	templateUrl: './registrar-contratistas.component.html',
	styles: [],
	providers: [
		ContractorService,
		UserService
	]
})
export class RegistrarContratistasComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public buttonText: string;

	public token: string;
	public contractor: Contractor;

	public tipoDocumento: Array<any>;
	public sexo: Array<any>;

	constructor(
		private _contractorService: ContractorService,
		private _userService: UserService
	) {
		this.buttonText = 'Registrar';
		
		this.token = this._userService.getToken();
		this.contractor = new Contractor(null,null,null,null,null,null,null);

		this.tipoDocumento = global.tipoDocumento;
		this.sexo = global.sexo;
	}

	ngOnInit(): void {
	}

	onSubmit( contractorRegisterForm ){
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this.contractor.nombres = this.contractor.nombres.toUpperCase().trim();
		this.contractor.apellidos = this.contractor.apellidos.toUpperCase().trim();
		if(this.contractor.profesion) this.contractor.profesion = this.contractor.profesion.toUpperCase().trim();

		this._contractorService.newContractor( this.contractor, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if(res.status == 'success'){
					swal('Registro exitoso', res.message, 'success');
					contractorRegisterForm.reset();
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
}
