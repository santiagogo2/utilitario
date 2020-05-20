import { Component, OnInit } from '@angular/core';

// Services
import { ContractorService, UserService  } from '../../../../services/service.index';

// Models
import { Contractor } from '../../../../models/model.index';

@Component({
	selector: 'app-listar-contratistas',
	templateUrl: './listar-contratistas.component.html',
	styles: [],
	providers: [
		ContractorService,
		UserService
	]
})
export class ListarContratistasComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public actualPage: number;
	public itemsPerPage: number;

	public token: string;
	public identity: any;
	public contractors: Contractor[];

	constructor(
		private _contractorService: ContractorService,
		private _userService: UserService
	) {
		let page = localStorage.getItem('contratistasPage');
		if( page ) this.actualPage = +page;
		else this.actualPage = 1;
		this.itemsPerPage = 20;

		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
	}

	ngOnInit(): void {
		this.contractorList();
	}

	contractorList(){
		this.status = undefined;
		this.responseMessage = undefined;

		this._contractorService.contractorList( this.token ).subscribe(
			res => {
				if( res.status == 'success' ){
					this.contractors = res.contractors;
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log(<any> error);
			}
		);
	}

	deleteContractor(id){}

	pageChange(event){
		localStorage.setItem( 'contratistasPage', event );
		this.actualPage = event;
	}
}
