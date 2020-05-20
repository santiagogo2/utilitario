import { Component, OnInit } from '@angular/core';

// Services
import { ContractService, UserService } from '../../../../services/service.index';

// Models
import { Contract } from '../../../../models/model.index';

@Component({
	selector: 'app-listar-contrato',
	templateUrl: './listar-contrato.component.html',
	styles: [],
	providers: [
		ContractService,
		UserService
	]
})
export class ListarContratoComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public actualPage: number;
	public itemsPerPage: number;

	public token: string;
	public identity: any;
	public contracts: Contract[];

	constructor(
		private _contractService: ContractService,
		private _userService: UserService
	) {
		this.actualPage = 1;
		this.itemsPerPage = 10;

		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
	}

	ngOnInit(): void {
		this.contractList();
	}

	contractList(){
		this.status = undefined;
		this.responseMessage = undefined;

		this._contractService.contractList( this.token ).subscribe(
			res => {
				if( res.status == 'success' ){
					this.contracts = res.contracts;
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log(<any> error);
			}
		);
	}

	deleteContract(id){}

	pageChange(event){
		this.actualPage = event;
	}
}
