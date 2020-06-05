import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// Services
import { SupervisorService, UserService } from '../../../../../services/service.index';

// Models
import { Supervisor } from '../../../../../models/model.index';

@Component({
	selector: 'app-supervisor-register',
	templateUrl: './supervisor-register.component.html',
	styles: [],
	providers: [
		SupervisorService,
		UserService,
	]
})
export class SupervisorRegisterComponent implements OnInit {
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
		this.buttonText = 'Registrar';

		this.token = this._userService.getToken();
		this.supervisor = new Supervisor(null,null,null);
	}

	ngOnInit(): void {
	}

	onSubmit(supervisorRegisterForm){
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this.supervisor.name = this.supervisor.name.toUpperCase().trim();
		this.supervisor.position = this.supervisor.position.toUpperCase().trim();

		this._supervisorService.newSupervisor( this.supervisor, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if( res.status == 'success' ){
					this.status = res.status;
					this.responseMessage = res.message;
					supervisorRegisterForm.reset();
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
