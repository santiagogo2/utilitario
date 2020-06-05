import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// Services
import { InsurerService, UserService } from '../../../../../services/service.index';

// Models
import { Insurer } from '../../../../../models/model.index';

@Component({
	selector: 'app-insurer-register',
	templateUrl: './insurer-register.component.html',
	styles: [],
	providers: [
		InsurerService,
		UserService,
	]
})
export class InsurerRegisterComponent implements OnInit {
	@Output() public changeView: EventEmitter<any> = new EventEmitter();

	public status: string;
	public responseMessage: string;
	public buttonText: string;
	public preloaderStatus: boolean;

	public token: string;
	public insurer: Insurer;

	constructor(
		private _insurerService: InsurerService,
		private _userService: UserService
	) {
		this.buttonText = 'Registrar';

		this.token = this._userService.getToken();
		this.insurer = new Insurer(null, null);
	}

	ngOnInit(): void {
	}

	onSubmit(insurerRegisterForm){
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this.insurer.name = this.insurer.name.toUpperCase().trim();

		this._insurerService.newInsurer( this.insurer, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if( res.status == 'success' ){
					this.status = res.status;
					this.responseMessage = res.message;
					insurerRegisterForm.reset();
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

	sendFlag(text){
		this.changeView.emit(text);
	}
}
