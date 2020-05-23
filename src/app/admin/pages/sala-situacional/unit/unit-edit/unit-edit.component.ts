import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// Services
import { UnitService, UserService } from '../../../../../services/service.index';

// Models
import { Unit } from '../../../../../models/model.index';

@Component({
	selector: 'app-unit-edit',
	templateUrl: '../unit-register/unit-register.component.html',
	styles: [],
	providers: [
		UnitService,
		UserService
	]
})
export class UnitEditComponent implements OnInit {
	@Output() public changeUnitView: EventEmitter<any> = new EventEmitter();

	public status: string;
	public responseMessage: string;
	public buttonText: string;
	public preloaderStatus: boolean;

	public token: string;
	public unit: Unit;

	constructor(
		private _unitService: UnitService,
		private _userService: UserService,
		private _route: ActivatedRoute
	) {
		this.buttonText = 'Actualizar';

		this.token = this._userService.getToken();
	}

	ngOnInit(): void {
		this.getUnit();
	}

	getUnit(){
		this._route.params.subscribe( params => {
			this.status = undefined;
			this.responseMessage = undefined;
			this.unit = undefined;

			let id = +params['id'];

			this._unitService.getUnit( id , this.token ).subscribe(
				res => {
					if( res.status == 'success' ){
						this.unit = res.unit;
					}
				},
				error => {
					this.status = error.error.status;
					this.responseMessage = error.error.message;
					console.log(<any>error);
				}
			);
		});
	}

	onSubmit(unitUpdateForm){
		this.status = undefined;
		this.responseMessage = undefined;

		this.unit.name = this.unit.name.toUpperCase().trim();

		this._unitService.updateUnit( this.unit, this.token ).subscribe(
			res => {
				if( res.status == 'success' ){
					this.sendFlag();
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log(<any>error);
			}
		);
	}

	sendFlag(){
		this.changeUnitView.emit('Listar');
	}
}
