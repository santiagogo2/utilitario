import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import swal from 'sweetalert';

// Services
import { ContractorService, global, UserService } from '../../../../services/service.index';

// Models
import { Contractor } from '../../../../models/model.index';

@Component({
	selector: 'app-editar-contratistas',
	templateUrl: '../registrar-contratistas/registrar-contratistas.component.html',
	styles: [],
	providers: [
		ContractorService,
		UserService
	]
})
export class EditarContratistasComponent implements OnInit {
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
		private _userService: UserService,
		private _router: Router,
		private _route: ActivatedRoute
	) {
		this.buttonText = 'Actualizar';
		
		this.token = this._userService.getToken();

		this.tipoDocumento = global.tipoDocumento;
		this.sexo = global.sexo;
	}

	ngOnInit(): void {
		this.getContractor();
	}

	getContractor(){
		this._route.params.subscribe( params => {
			this.status = undefined;
			this.responseMessage = undefined;
			this.contractor = undefined;
			
			let id = params['id'];

			this._contractorService.getContractor( id, this.token ).subscribe(
				res => {
					if( res.status == 'success' ){
						this.contractor = res.contractor;
					}
				},
				error => {
					this.status = error.error.status;
					this.responseMessage = error.error.message;
					console.log(<any>error);
				}
			);			
		});

	}

	onSubmit(editContractorForm){
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this.contractor.nombres = this.contractor.nombres.toUpperCase().trim();
		this.contractor.apellidos = this.contractor.apellidos.toUpperCase().trim();
		if(this.contractor.profesion) this.contractor.profesion = this.contractor.profesion.toUpperCase().trim();

		this._contractorService.updateContractor( this.contractor, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if( res.status == 'success' ){
					swal('Registro exitoso', res.message, 'success');
					this._router.navigate(['/contratacion/contratistas/listar']);
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
