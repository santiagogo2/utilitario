import { Component, OnInit } from '@angular/core';

// Services
import { OccupationService, UserService } from '../../../../services/service.index';

// Models
import { Occupation } from '../../../../models/model.index';

@Component({
	selector: 'app-listar-ocupacion',
	templateUrl: './listar-ocupacion.component.html',
	styles: [],
	providers: [
		OccupationService,
		UserService,
	]
})
export class ListarOcupacionComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public actualPage: number;
	public itemsPerPage: number;

	public occupations: Occupation[];
	public token: string;

	constructor(
		private _occupationService: OccupationService,
		private _userService: UserService
	) {
		this.token = this._userService.getToken();
		let page = +localStorage.getItem( 'occupationPage' );
		if( page ) this.actualPage = page;
		else this.actualPage = 1;
		this.itemsPerPage = 20;
	}

	ngOnInit(): void {
		this.occupationList();
	}

	occupationList(){
		this._occupationService.occupationList( this.token ).subscribe(
			res => {
				if( res.status == 'success' ){
					this.occupations = res.occupations;
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
		localStorage.setItem( 'occupationPage', event );
	}
}
