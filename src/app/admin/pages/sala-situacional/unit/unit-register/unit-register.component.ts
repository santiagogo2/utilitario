import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// Services
import { UnitService, UserService } from '../../../../../services/service.index';

// Models
import { Unit } from '../../../../../models/model.index';

@Component({
	selector: 'app-unit-register',
	templateUrl: './unit-register.component.html',
	styles: [],
	providers: [
		UnitService,
		UserService
	]
})
export class UnitRegisterComponent implements OnInit {
	@Output() public changeUnitView: EventEmitter<any> = new EventEmitter();

	public status: string;
	public responseMessage: string;
	public buttonText: string;
	public preloaderStatus: boolean;

	public token: string;
	public unit: Unit;

	constructor(
		private _unitService: UnitService,
		private _userService: UserService
	) {
		this.buttonText = 'Registrar';

		this.token = this._userService.getToken();
		this.unit = new Unit(null, null);
	}

	ngOnInit(): void {
	}

	onSubmit(unitRegisterForm){
		this.status = undefined;
		this.responseMessage = undefined;

		this.unit.name = this.unit.name.toUpperCase().trim();

		this._unitService.newUnit( this.unit, this.token ).subscribe(
			res => {
				if( res.status == 'success' ){
					this.status = res.status;
					this.responseMessage = res.message;
					unitRegisterForm.reset();
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
