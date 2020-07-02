import { Component, OnInit } from '@angular/core';
import { FollowService, UserService } from 'src/app/services/service.index';
import { Follow } from 'src/app/models/model.index';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-listar-seguimiento',
	templateUrl: './listar-seguimiento.component.html',
	styles: [],
	providers: [
		FollowService,
		UserService,
	]
})
export class ListarSeguimientoComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public isDate: boolean;
	public searchResponseMessage: string;
	public searchLoaderStatus: boolean;
	public actualPage: number;
	public itemsPerPage: number;
	public adminFlag: boolean;
	public chain: string;

	public token: string;
	public identity: any;
	public follows: Follow[];

	constructor(
		private _followService: FollowService,
		private _userService: UserService,
		private _route: ActivatedRoute,
	) {
		let samplesPage = +localStorage.getItem( 'followPage' );
		this.actualPage = samplesPage ? samplesPage : 1;
		this.itemsPerPage = 40;

		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
	}

	ngOnInit(): void {
		this._route.params.subscribe( params => {
			let document = params['document'];

			if(document){
				this.chain = document;
				this.searchText();
			} else {
				this.followList();
			}	
		});
		this.adminFlag = (this.identity.role=='ADMIN_ROLE' || this.identity.role=='ADMIN_GESTION_RIESGO_ROLE') ? true:false;
	}

	followList(){
		this.status = undefined;
		this.responseMessage = undefined;
		this.searchLoaderStatus = true;
		
		this._followService.followList( this.token ).subscribe(
			res => {
				this.searchLoaderStatus = false;
				if( res.status == 'success' ){
					this.follows = res.follows;
				}
			},
			error => {
				this.searchLoaderStatus = false;
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log(<any>error);
			}
		);

	}

	searchText(){
		this.searchResponseMessage = undefined;
		this.searchLoaderStatus = true;

		this._followService.getFollowByChain( this.chain, this.token ).subscribe(
			res => {
				this.searchLoaderStatus = false;
				if( res.status == 'success' ){
					this.follows = res.follows;
				}
			},
			error => {
				this.searchLoaderStatus = false;
				this.searchResponseMessage = error.error.message;
				console.log(<any>error);
			}
		)
	}

	deleteFollow(id){
		this.status = undefined;
		this.responseMessage = undefined;
		let loader = document.getElementById('loader'+id);
		loader.style.display = 'block';
		
		this._followService.deleteFollow(id, this.token).subscribe(
			res => {
				loader.style.display = 'none';
				if( res.status == 'success' ){
					this.status = res.status;
					this.responseMessage = res.message;
					this.followList();
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
		localStorage.setItem('followPage', event);
		this.actualPage = event;
    }
}
