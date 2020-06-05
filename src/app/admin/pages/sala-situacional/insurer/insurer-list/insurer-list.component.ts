import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// Services
import { InsurerService, UserService } from '../../../../../services/service.index';

// Models
import { Insurer } from '../../../../../models/model.index';

@Component({
	selector: 'app-insurer-list',
	templateUrl: './insurer-list.component.html',
	styles: [],
	providers: [
		InsurerService,
		UserService,
	]
})
export class InsurerListComponent implements OnInit {
	@Output() public changeView: EventEmitter<string> = new EventEmitter();
	public status: string;
	public responseMessage: string;
	public actualPage: number;
	public itemsPerPage: number;

	public token: string;
	public insurers: Insurer[];

	constructor(
		private _insurerService: InsurerService,
		private _userService: UserService
	) {
		this.actualPage = 1;
		this.itemsPerPage = 7;

		this.token = this._userService.getToken();
	}

	ngOnInit(): void {
		this.insurerList();
	}

	insurerList(){
		this._insurerService.insurerList( this.token ).subscribe(
			res => {
				if( res.status == 'success' ){
					this.insurers = res.insurers;
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log(<any>error);				
			}
		);
	}

	deleteInsurer( id ){
		this.status = undefined;
		this.responseMessage = undefined;
		let loader = document.getElementById('loaderInsurer'+id);

		loader.style.display = 'block';

		this._insurerService.deleteInsurer( id, this.token ).subscribe(
			res => {
				loader.style.display = 'none';
				
				if( res.status == 'success' ){
					this.status = res.status;
					this.responseMessage = res.message;
					this.insurerList();
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
		if( editId == 0 ) editId = 'zero';
		if( editId ) localStorage.setItem( 'insurerEditId', editId );
		this.changeView.emit(event);
	}
}
