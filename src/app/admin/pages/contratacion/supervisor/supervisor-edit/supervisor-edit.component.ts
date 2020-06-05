import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// Services
import { SupervisorService, UserService } from '../../../../../services/service.index';

// Models
import { Supervisor } from '../../../../../models/model.index';

@Component({
	selector: 'app-supervisor-edit',
	templateUrl: '../supervisor-register/supervisor-register.component.html',
	styles: [],
	providers: [
		SupervisorService,
		UserService,
	]
})
export class SupervisorEditComponent implements OnInit {
	@Output() public changeView: EventEmitter<string> = new EventEmitter;
	public status: string;
	public responseMessage: string;
	public buttonText: string;
	public preloaderStatus: boolean;

	public token: string;
	public supervisor: Supervisor;

	constructor(
		private _supervisorService: SupervisorService,
		private _userService: UserService,
	) {
		this.buttonText = 'Actualizar';

		this.token = this._userService.getToken();
	}

	ngOnInit(): void {
		this.getSupervisor();
	}

	getSupervisor(){
		this.status = undefined;
		this.responseMessage = undefined;
		this.supervisor = undefined;

		let id = localStorage.getItem( 'supervisorEditId' );

		if( !id || id == 'zero' ) id = '0';
		this._supervisorService.getSupervisor( id, this.token ).subscribe(
			res => {
				if( res.status == 'success' ){
					this.supervisor = res.supervisor;
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;				
				console.log(<any>error);
			}
		);
	}

	onSubmit(supervisorEditForm){
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this.supervisor.name = this.supervisor.name.toUpperCase().trim();
		this.supervisor.position = this.supervisor.position.toUpperCase().trim();

		this._supervisorService.updateSupervisor( this.supervisor, this.token ).subscribe(
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
