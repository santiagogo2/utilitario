import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// Services
import { SpendingCoordinatorService, UserService } from '../../../../../services/service.index';

// Models
import { SpendingCoordinator } from '../../../../../models/model.index';

@Component({
	selector: 'app-spending-register',
	templateUrl: './spending-register.component.html',
	styles: [],
	providers: [
		SpendingCoordinatorService,
		UserService,
	]
})
export class SpendingRegisterComponent implements OnInit {
	@Output() public changeView: EventEmitter<string> = new EventEmitter;
	
	public status: string;
	public responseMessage: string;
	public buttonText: string;
	public preloaderStatus: boolean;

	public token: string;
	public spendingCoordinator: SpendingCoordinator;

	constructor(
		private _spendingCoordinatorService: SpendingCoordinatorService,
		private _userService: UserService,
	) {
		this.buttonText = 'Registrar';

		this.token = this._userService.getToken();
		this.spendingCoordinator = new SpendingCoordinator(null,null,null);
	}

	ngOnInit(): void {
	}

	onSubmit(spendingCoordinatorRegisterForm){
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this.spendingCoordinator.name = this.spendingCoordinator.name.toUpperCase().trim();

		this._spendingCoordinatorService.newSpendingCoordinator( this.spendingCoordinator, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if( res.status == 'success' ){
					this.status = res.status;
					this.responseMessage = res.message;
					spendingCoordinatorRegisterForm.reset();
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
