import { Component, OnInit } from '@angular/core';
import { CollaboratorsService } from '../../../../services/service.index';
import { UserService } from '../../../../services/service.index';

import { Collaborators } from '../../../../models/model.index';

@Component({
	selector: 'app-listar-colaboradores',
	templateUrl: './listar-colaboradores.component.html',
	styles: [],
	providers: [
		CollaboratorsService,
		UserService
	]
})
export class ListarColaboradoresComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public actualPage: number;
	public itemsPerPage: number;

	public collaborators: Collaborators[];
	public token: string;

	constructor(
		private _collaboratorService: CollaboratorsService,
		private _userService: UserService
	) {
		this.token = this._userService.getToken();
		let page = +localStorage.getItem( 'collaboratorPage' );
		if( page ) this.actualPage = page;
		else this.actualPage = 1;
		this.itemsPerPage = 20;
	}

	ngOnInit(): void {
		this.getCollaborators();
	}

	getCollaborators(){		
		this._collaboratorService.getCollaborators(this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this.collaborators = response.collaborators;
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log(<any> error);
			}
		);
	}

	pageChange(event){
		this.actualPage = event;
		localStorage.setItem( 'collaboratorPage', event );
	}
}
