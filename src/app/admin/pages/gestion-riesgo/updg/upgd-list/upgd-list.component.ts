import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// Services
import { UpgdService, UserService } from 'src/app/services/service.index';

// Models
import { Upgd } from 'src/app/models/model.index';

@Component({
	selector: 'app-upgd-list',
	templateUrl: './upgd-list.component.html',
	styles: [],
	providers: [
		UpgdService,
		UserService,		
	]
})
export class UpgdListComponent implements OnInit {
	@Output() public changeView: EventEmitter<any> = new EventEmitter();
	public status: string;
	public responseMessage: string;
	public actualPage: number;
	public itemsPerPage: number;

	public token: string;
	public upgds: Upgd[];

	constructor(
		private _upgdService: UpgdService,
		private _userService: UserService,
	) {
		this.actualPage = 1;
		this.itemsPerPage = 7;

		this.token = this._userService.getToken();
	}

	ngOnInit(): void {
		this.upgdList();
	}

	upgdList(){
		this._upgdService.upgdList( this.token ).subscribe(
			res => {
				if( res.status == 'success' ){
					this.upgds = res.UPGD;
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log(<any>error);
			}
		);
	}

	deleteUpgd(id){
		this.status = undefined;
		this.responseMessage = undefined;

		let loader = document.getElementById('loaderUpgd' + id);

		loader.style.display = 'block';

		this._upgdService.deleteUpgd( id, this.token ).subscribe(
			res => {
				loader.style.display = 'none';
				
				if( res.status == 'success' ){
					this.status = res.status;
					this.responseMessage = res.message;
					this.upgdList();
				}
			},
			error => {
				loader.style.display = 'none';
				document.body.animate([{scrollTop:0}], {duration: 1000});

				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log( <any>error );
			}
		);
	}

	pageChange(event){
		this.actualPage = event;
	}

	sendFlag(event, editId=null){
		if( editId ) localStorage.setItem( 'upgdEditId', editId );
		this.changeView.emit(event);
	}
}
