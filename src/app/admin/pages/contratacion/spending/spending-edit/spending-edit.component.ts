import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// Services
import { SpendingCoordinatorService, UserService } from '../../../../../services/service.index';

// Models
import { SpendingCoordinator } from '../../../../../models/model.index';

@Component({
	selector: 'app-spending-edit',
	templateUrl: '../spending-register/spending-register.component.html',
	styles: [],
	providers: [
		SpendingCoordinatorService,
		UserService
	]
})
export class SpendingEditComponent implements OnInit {
	@Output() public changeView: EventEmitter<string> = new EventEmitter;

	public status: string;
	public responseMessage: string;
	public buttonText: string;
	public preloaderStatus: boolean;

	public token: string;
	public spendingCoordinator: SpendingCoordinator;

	constructor(
		private _spendingCoordinatorService: SpendingCoordinatorService,
		private _userService: UserService
	) {
		this.buttonText = 'Actualizar';

		this.token = this._userService.getToken();		
	}

	ngOnInit(): void {
		this.getSpendingCoordinator();
	}

	getSpendingCoordinator(){
		this.status = undefined;
		this.responseMessage = undefined;
		this.spendingCoordinator = undefined;

		let id = localStorage.getItem( 'spendingEditId' );

		if( !id || id == 'zero' ) id = '0';
		this._spendingCoordinatorService.getSpendingCoordinator( id, this.token ).subscribe(
			res => {
				if( res.status == 'success' ){
					this.spendingCoordinator = res.spending;
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;				
				console.log(<any>error);
			}
		);
	}

	onSubmit(spendingCoordinatorEditForm){
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this.spendingCoordinator.name = this.spendingCoordinator.name.toUpperCase().trim();

		this._spendingCoordinatorService.updateSpendingCoordinator( this.spendingCoordinator, this.token ).subscribe(
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

				if(error.error.errors){
					this.responseMessage = this.responseMessage + '. ' + JSON.stringify(error.error.errors);
				}

				console.log(<any>error);
			}
		);
	}

	sendFlag(){
		this.changeView.emit('Listar');
	}
}
