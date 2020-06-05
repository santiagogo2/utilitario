import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// Services
import { UnitService, UserService } from '../../../../../services/service.index';

// Models
import { Unit } from '../../../../../models/model.index';

@Component({
	selector: 'app-unit-list',
	templateUrl: './unit-list.component.html',
	styles: [],
	providers: [
		UnitService,
		UserService
	]
})
export class UnitListComponent implements OnInit {
	@Output() public changeView: EventEmitter<any> = new EventEmitter();
	public status: string;
	public responseMessage: string;
	public actualPage: number;
	public itemsPerPage: number;

	public token: string;
	public units: Unit[];

	constructor(
		private _unitService: UnitService,
		private _userService: UserService
	) {
		this.actualPage = 1;
		this.itemsPerPage = 7;

		this.token = this._userService.getToken();
	}

	ngOnInit(): void {
		this.unitList();
	}

	unitList(){
		this._unitService.unitList( this.token ).subscribe(
			res => {
				if( res.status == 'success' ){
					this.units = res.units;
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log(<any>error);
			}
		);
	}

	deleteUnit(id){
		this.status = undefined;
		this.responseMessage = undefined;
		let loader = document.getElementById('loaderUnit'+id);

		loader.style.display = 'block';

		this._unitService.deleteUnit( id, this.token ).subscribe(
			res => {
				loader.style.display = 'none';
				
				if( res.status == 'success' ){
					this.status = res.status;
					this.responseMessage = res.message;
					this.unitList();
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
		if( editId ) localStorage.setItem( 'unitEditId', editId );
		this.changeView.emit(event);
	}
}
