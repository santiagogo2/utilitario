import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import swal from 'sweetalert';

// Services
import { RoleService, UserService } from '../../../../services/service.index';

// Models
import { Role } from '../../../../models/model.index';

@Component({
	selector: 'app-role-edit',
	templateUrl: '../role-register/role-register.component.html',
	styles: [],
	providers: [
		RoleService,
		UserService
	]
})
export class RoleEditComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public buttonText: string;
	public preloaderStatus: boolean;

	public role: Role;
	public token: string;

	constructor(
		private _userService: UserService,
		private _roleService: RoleService,
		private _router: Router,
		private _route: ActivatedRoute
	) {
		this.buttonText = 'Actualizar';

		this.token = this._userService.getToken();		
	}

	ngOnInit(): void {
		this.getRole();
	}

	onSubmit( roleEditForm ){
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this._roleService.updateRole( this.role, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;

				if( res.status == 'success' ){
					swal('Role editado exitosamente', res.message, 'success');
					this._router.navigate(['/admin/roles/listar']);
				}
			},
			error => {
				this.preloaderStatus = false;
				this.responseMessage = error.error.message;

				if(error.error.errors){
					this.responseMessage = this.responseMessage + '. ' + JSON.stringify(error.error.errors);
				}

				this.status = 'error';
				swal('Error', this.responseMessage, 'error');
				console.log(<any>error);
			}
		);
	}

	getRole(){
		this._route.params.subscribe( params => {
			this.role = undefined;
			this.status = undefined;
			this.responseMessage = undefined;
			
			let id = +params['id'];

			this._roleService.getRole( id, this.token ).subscribe(
				res => {
					if(res.status == 'success'){
						this.role = res.role;
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
}
