import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';

// Services
import { ContractService, ContractorService, global, UserService } from '../../../../services/service.index';

// Models
import { Contract, Contractor } from '../../../../models/model.index';

@Component({
	selector: 'app-editar-contrato',
	templateUrl: '../registrar-contrato/registrar-contrato.component.html',
	styles: [],
	providers: [
		ContractService,
		ContractorService,
		UserService
	]
})
export class EditarContratoComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public buttonText: string;
	public faSpinner = faSpinner;
	public searchStatus: string;
	public searchResponseMessage: string;
	public searchPreloaderStatus: boolean;

	public token: string;
	public identity: any;
	public contract: any;

	public modalidad: Array<any>;
	public contractDocument: number;
	public contractor: Contractor;
	public contractorName: string;

	constructor(
		private _contractService: ContractService,
		private _contractorService: ContractorService,
		private _userService: UserService,
		private _router: Router,
		private _route: ActivatedRoute
	) {
		this.buttonText = 'Actualizar';

		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();

		this.modalidad = global.modalidad;
	}

	ngOnInit(): void {
		this.getContract();
	}

	getContract(){
		this._route.params.subscribe( params => {
			this.status = undefined;
			this.responseMessage = undefined;
			this.contract = undefined;
			this.contractDocument = undefined;
			this.contractorName = undefined;

			let id = +params['id'];

			this._contractService.getContract(id, this.token).subscribe(
				res => {
					if( res.status == 'success' ){
						this.contract = res.contract;
						this.contractor = this.contract.contractor;
						this.contractDocument = this.contractor.documento;
						this.contractorName = this.contractor.nombres + ' ' + this.contractor.apellidos;
					}
				},
				error => {
					this.status = error.error.status;
					this.responseMessage = error.error.message;
					console.log(error);
				}
			);
		});
	}

	onSubmit(updateRegisterForm){
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;
		delete this.contract.contractor;

		// Text uppercase
		this.contract.nombreSupervisor = this.contract.nombreSupervisor.toUpperCase().trim();
		this.contract.cargoSupervisor = this.contract.cargoSupervisor.toUpperCase().trim();

		this._contractService.updateContract( this.contract, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if( res.status == 'success' ){
					swal('Registro actualizado', res.message, 'success');
					this._router.navigate(['/contratacion/contratos/listar']);
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

	getContractorByDocument(){
		this.searchStatus = undefined;
		this.searchResponseMessage = undefined;
		this.searchPreloaderStatus = true;
		this.contractor = undefined;
		this.contract.contractors_id = undefined;

		this._contractorService.getContractorByDocument( this.contractDocument, this.token ).subscribe(
			res => {
				this.searchPreloaderStatus = false;
				if( res.status == 'success' ){
					this.contractor = res.contractor;
					this.contractorName = res.contractor.nombres + ' ' + res.contractor.apellidos;
				}
			},
			error => {
				this.searchPreloaderStatus = false;
				this.searchStatus = error.error.status;
				this.searchResponseMessage = error.error.message;
				console.log(<any>error);
			}
		);
	}
}