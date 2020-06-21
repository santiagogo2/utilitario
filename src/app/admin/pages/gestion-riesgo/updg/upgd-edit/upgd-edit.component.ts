import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UpgdService, UserService } from 'src/app/services/service.index';
import { Upgd } from 'src/app/models/model.index';

@Component({
	selector: 'app-upgd-edit',
	templateUrl: '../upgd-register/upgd-register.component.html',
	styles: [],
	providers: [
		UpgdService,
		UserService,
	]
})
export class UpgdEditComponent implements OnInit {
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
		this.buttonText = 'Actualizar';

		this.token = this._userService.getToken();
	}

	ngOnInit(): void {
		this.getUpdg();
	}

	getUpdg(){
		this.status = undefined;
		this.responseMessage = undefined;
		this.upgd = undefined;

		let id = localStorage.getItem( 'updgEditId' );

		this._upgdService.getUpgd( id, this.token ).subscribe(
			res => {
				if( res.status == 'success' ){
					this.upgd = res.UPGD;
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;				
				console.log(<any>error);
			}
		);
	}

	onSubmit(updgEditForm){
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this._upgdService.updateUpgd( this.upgd, this.token ).subscribe(
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

	upperCase($event){
		$event = $event ? $event.toUpperCase().trim():$event;
		return $event;
	}

	sendFlag(){
		this.changeView.emit('Listar');
	}
}
