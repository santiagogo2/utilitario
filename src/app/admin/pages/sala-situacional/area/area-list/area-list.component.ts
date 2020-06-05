import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// Services
import { AreaService, UserService } from '../../../../../services/service.index';

// Models
import { Area } from '../../../../../models/model.index';

@Component({
	selector: 'app-area-list',
	templateUrl: './area-list.component.html',
	styles: [],
	providers: [
		AreaService,
		UserService
	]
})
export class AreaListComponent implements OnInit {
	@Output() public changeView: EventEmitter<any> = new EventEmitter();
	public status: string;
	public responseMessage: string;
	public actualPage: number;
	public itemsPerPage: number;

	public token: string;
	public areas: Area[];

	constructor(
		private _areaService: AreaService,
		private _userService: UserService
	) {
		this.actualPage = 1;
		this.itemsPerPage = 7;

		this.token = this._userService.getToken();
	}

	ngOnInit(): void {
		this.areaList();
	}

	areaList(){
		this._areaService.areaList( this.token ).subscribe(
			res => {
				if( res.status == 'success' ){
					this.areas = res.areas;
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log(<any>error);
			}
		);
	}

	deleteArea(id){
		this.status = undefined;
		this.responseMessage = undefined;
		let loader = document.getElementById('loaderArea'+id);

		loader.style.display = 'block';

		this._areaService.deleteArea( id, this.token ).subscribe(
			res => {
				loader.style.display = 'none';
				
				if( res.status == 'success' ){
					this.status = res.status;
					this.responseMessage = res.message;
					this.areaList();
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
		if( editId ) localStorage.setItem( 'areaEditId', editId );
		this.changeView.emit(event);
	}
}
