import { Component, OnInit } from '@angular/core';

// Services
import { RoleService, UserService } from '../../../../services/service.index';

// Models
import { Role } from '../../../../models/model.index';

@Component({
	selector: 'app-role-list',
	templateUrl: './role-list.component.html',
	styles: [],
	providers: [
		RoleService,
		UserService
	]
})
export class RoleListComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public actualPage: number;
	public itemsPerPage: number;

	public roles: Role[];
	public token: string;
	public identity: any;

	constructor(
		private _roleService: RoleService,
		private _userService: UserService
	) {
		this.actualPage = 1;
		this.itemsPerPage = 10;

		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
	}

	ngOnInit(): void {
		this.rolesList();
	}

	rolesList() {
		this.status = undefined;
		this.responseMessage = undefined;

		this._roleService.roleList( this.token ).subscribe(
			res => {
				if( res.status == 'success' ){
					this.roles = res.roles;
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log(<any>error);
			}
		);
	}

	deleteRole( id ){
		this.status = undefined;
		this.responseMessage = undefined;
		let loader = document.getElementById('loader'+id);

		loader.style.display = 'block';

		this._roleService.deleteRole( id, this.token ).subscribe(
			res => {
				loader.style.display = 'none';
				
				if( res.status == 'success' ){
					this.status = res.status;
					this.responseMessage = res.message;
					this.rolesList();
				}
			},
			error => {
				loader.style.display = 'none';
				document.body.animate([{scrollTop:0}], {duration: 1000})

				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log( <any>error );
			}
		);
	}

	pageChange(event){
		this.actualPage = event;
	}
}
