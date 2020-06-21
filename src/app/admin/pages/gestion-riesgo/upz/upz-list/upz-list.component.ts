import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// Services
import { UpzService, UserService } from 'src/app/services/service.index';

// Models
import { Upz } from 'src/app/models/model.index';

@Component({
	selector: 'app-upz-list',
	templateUrl: './upz-list.component.html',
	styles: [],
	providers:[
		UpzService,
		UserService,
	]
})
export class UpzListComponent implements OnInit {
	@Output() public changeView: EventEmitter<any> = new EventEmitter();
	public status: string;
	public responseMessage: string;
	public actualPage: number;
	public itemsPerPage: number;

	public token: string;
	public upzs: Upz[];

	constructor(
		private _upzService: UpzService,
		private _userService: UserService,
	) {
		this.actualPage = 1;
		this.itemsPerPage = 7;

		this.token = this._userService.getToken();
	}

	ngOnInit(): void {
		this.upzList();
	}

	upzList(){
		this._upzService.upzList( this.token ).subscribe(
			res => {
				if( res.status == 'success' ){
					this.upzs = res.UPZ;
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log(<any>error);
			}
		);
	}

	deleteUpz(id){
		this.status = undefined;
		this.responseMessage = undefined;

		let loader = document.getElementById('loaderUpz' + id);

		loader.style.display = 'block';

		this._upzService.deleteUpz( id, this.token ).subscribe(
			res => {
				loader.style.display = 'none';
				
				if( res.status == 'success' ){
					this.status = res.status;
					this.responseMessage = res.message;
					this.upzList();
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
		if( editId ) localStorage.setItem( 'upzEditId', editId );
		this.changeView.emit(event);
	}
}
