import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// Services
import { UpgdService, UserService } from 'src/app/services/service.index';

// Models
import { Upgd } from 'src/app/models/model.index';

@Component({
	selector: 'app-upgd-register',
	templateUrl: './upgd-register.component.html',
	styles: [],
	providers:[
		UpgdService,
		UserService,
	]
})
export class UpgdRegisterComponent implements OnInit {
	@Output() public changeView: EventEmitter<string> = new EventEmitter;
	
	public status: string;
	public responseMessage: string;
	public buttonText: string;
	public preloaderStatus: boolean;

	public token: string;
	public upgd: Upgd;

	constructor(
		private _upgdService: UpgdService,
		private _userService: UserService,
	) {
		this.buttonText = 'Registrar';

		this.token = this._userService.getToken();
		this.upgd = new Upgd(null,null);
	}

	ngOnInit(): void {
	}

	onSubmit(spendingCoordinatorRegisterForm){
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this._upgdService.newUpgd( this.upgd, this.token ).subscribe(
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

	upperCase($event){
		$event = $event ? $event.toUpperCase().trim():$event;
		return $event;
	}

	sendFlag(){
		this.changeView.emit('Listar');
	}
}
