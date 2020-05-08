import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CollaboratorsService } from '../../../../services/service.index';
import { UserService } from '../../../../services/service.index';

import { Collaborators } from '../../models/collaborators';


@Component({
	selector: 'app-relacionar-colaboradores',
	templateUrl: './relacionar-colaboradores.component.html',
	styles: [],
	providers: [
		CollaboratorsService,
		UserService
	]
})
export class RelacionarColaboradoresComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public origen: number;

	public searchType: number;
	public searchValue: any;

	public token: string;
	public collaborators: Collaborators[];

	constructor(
		private _collaboratorService: CollaboratorsService,
		private _userService: UserService,
		private _router: Router,
		private _route: ActivatedRoute
	) {
		this.token = this._userService.getToken();
	}

	ngOnInit(): void {
		localStorage.removeItem('utilitarioCollaboratorDocument');
		this._route.params.subscribe(params => {
			this.origen = +params['id'];
		});
	}

	onSubmitSearch(){
		this.status = undefined;
		this.responseMessage = undefined;
		this.collaborators = undefined;

		if(this.searchType == 1){
			this.getCollaborator();
		}
	}

	getCollaborator(){
		this._collaboratorService.getCollaboratorByDocument(this.searchValue, this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this.collaborators = response.collaborator;
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				localStorage.setItem('utilitarioCollaboratorDocument', this.searchValue);
				console.log(<any>error);
			}
		);
	}

	relacionar(afectado){
		this._collaboratorService.updateRelated(afectado, this.origen, this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this.status = response.status;
					this.responseMessage = response.message;
					console.log(this.responseMessage);
					this.getCollaborator();
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log(<any>error);
			}
		);
	}
}
