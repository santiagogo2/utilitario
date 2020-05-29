import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// Services
import { AreaService, UserService } from '../../../../../services/service.index';

// Models
import { Area } from '../../../../../models/model.index';

@Component({
	selector: 'app-area-edit',
	templateUrl: '../area-register/area-register.component.html',
	styles: [],
	providers: [
		AreaService,
		UserService
	]
})
export class AreaEditComponent implements OnInit {
	@Output() public changeView: EventEmitter<any> = new EventEmitter();

	public status: string;
	public responseMessage: string;
	public buttonText: string;
	public preloaderStatus: boolean;

	public token: string;
	public area: Area;

	constructor(
		private _areaService: AreaService,
		private _userService: UserService,
		private _route: ActivatedRoute
	) {
		this.buttonText = 'Actualizar';

		this.token = this._userService.getToken();
	}

	ngOnInit(): void {
		this.getArea();
	}

	getArea(){
		this.status = undefined;
		this.responseMessage = undefined;
		this.area = undefined;

		let id = localStorage.getItem( 'areaEditId' );

		if( !id || id == 'zero' ) id = '0';
		this._areaService.getArea( id , this.token ).subscribe(
			res => {
				if( res.status == 'success' ){
					this.area = res.area;
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log(<any>error);
			}
		);
	}

	onSubmit(areaUpdateForm){
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this.area.name = this.area.name.toUpperCase().trim();

		this._areaService.updateArea( this.area, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if( res.status == 'success' ){
					this.sendFlag();
				}
			},
			error => {
				this.preloaderStatus = false;
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log(<any>error);
			}
		);
	}

	sendFlag(){
		this.changeView.emit('Listar');
	}
}
