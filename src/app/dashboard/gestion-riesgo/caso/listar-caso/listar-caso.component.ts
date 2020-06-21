import { Component, OnInit } from '@angular/core';

// Services
import { CaseService, UserService } from 'src/app/services/service.index';

// Models
import { Caso } from 'src/app/models/model.index';

@Component({
	selector: 'app-listar-caso',
    templateUrl: './listar-caso.component.html',
    styles: [],
    providers: [
		CaseService,
		UserService,
    ]
})
export class ListarCasoComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public actualPage: number;
	public itemsPerPage: number;
	public adminFlag: boolean;

	public token: string;
	public identity: any;
	public cases: Caso[];

	constructor(
		private _caseService: CaseService,
		private _userService: UserService,
	) {
		let grcasesPage = +localStorage.getItem( 'grcasesPage' );
		this.actualPage = grcasesPage ? grcasesPage : 1;
		this.itemsPerPage = 40;

		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
	}

    ngOnInit(): void {
		this.casesList();
		this.adminFlag = (this.identity.role=='ADMIN_ROLE' || this.identity.role=='ADMIN_GESTION_RIESGO_ROLE') ? true:false;
    }

	casesList(){
		this._caseService.casesList( this.token ).subscribe(
			res => {
				if( res.status == 'success' ){
					this.cases = res.grcases;
				}
			},
			error => {
 				this.status = 'error';
				this.responseMessage = error.error.message;
				console.log( <any>error );
			}
		);
	}

	validateNull(val){
		return val ? val : '';
	}

	deleteCase(id){
		this.status = undefined;
		this.responseMessage = undefined;
		let loader = document.getElementById('loader'+id);
		loader.style.display = 'block';
		
		this._caseService.deleteCase(id, this.token).subscribe(
			res => {
				loader.style.display = 'none';
				if( res.status == 'success' ){
					this.status = res.status;
					this.responseMessage = res.message;
					this.casesList();
				}
			},
			error => {
				loader.style.display = 'none';
				document.body.animate([{scrollTop:0}], {duration: 1000});
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log(<any>error);
			}
		);
    }

    pageChange(event){
		localStorage.setItem('grcasesPage', event);
		this.actualPage = event;
    }
}
