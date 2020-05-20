import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert';

// Services
import { RoleService, UserService } from '../../../../services/service.index';

// Models
import { Role } from '../../../../models/model.index';

@Component({
	selector: 'app-role-register',
	templateUrl: './role-register.component.html',
	styles: [],
	providers: [
		RoleService,
		UserService
	]
})
export class RoleRegisterComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public buttonText: string;
	public preloaderStatus: boolean;

	public role: Role;
	public token: string;

	constructor(
		private _userService: UserService,
		private _roleService: RoleService,
		private _router: Router
	) {
		this.buttonText = 'Registrar';

		this.role = new Role(null,null,null);
		this.token = this._userService.getToken();
	}

	ngOnInit(): void {
	}

	onSubmit( roleRegisterForm ){
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this._roleService.newRole( this.role, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if(res.status == 'success'){
					swal('Registro exitoso', res.message, 'success');
					roleRegisterForm.reset();
				}
			},
			error => {
				this.preloaderStatus = false;
				this.status = error.error.status;
				this.responseMessage = error.error.message;				

				if(error.error.errors){
					this.responseMessage = this.responseMessage + '. ' + JSON.stringify(error.error.errors);
				}

				swal('Error', this.responseMessage, 'error');
				console.log(<any>error);
			}
		);
	}
}
