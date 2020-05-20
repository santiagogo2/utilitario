import { Component, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';

// Services
import { ContractService, ContractorService, global, UserService } from '../../../../services/service.index';

// Models
import { Contract, Contractor } from '../../../../models/model.index';

@Component({
	selector: 'app-registrar-contrato',
	templateUrl: './registrar-contrato.component.html',
	styles: [],
	providers: [
		ContractService,
		ContractorService,
		UserService
	]
})
export class RegistrarContratoComponent implements OnInit {
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
	public contract: Contract;

	public modalidad: Array<any>;
	public contractDocument: number;
	public contractor: Contractor;
	public contractorName: string;

	constructor(
		private _contractService: ContractService,
		private _contractorService: ContractorService,
		private _userService: UserService
	) {
		this.buttonText = 'Registrar';

		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
		this.contract = new Contract(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);

		this.modalidad = global.modalidad;
	}

	ngOnInit(): void {
	}

	onSubmit(contractRegisterForm){
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;
		console.log(this.contract);

		this._contractService.newContract( this.contract, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if( res.status == 'success' ){
					swal('Registro exitoso', res.message, 'success');
					this.contractor = undefined;
					this.contract.contractors_id = undefined;
					contractRegisterForm.reset();
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
