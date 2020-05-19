import { Component, OnInit } from '@angular/core';

// Models
import { User } from '../../../../models/model.index';

// Services
import { global, UserService } from '../../../../services/service.index';

@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html',
	styles: [],
	providers: [UserService]
})
export class UserListComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public actualPage: number;
	public itemsPerPage: number;

	public token: string;
	public identity: any;
	public users: User[];

	constructor(
		private _userService: UserService
	) {
		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
		this.actualPage = 1;
		this.itemsPerPage = 20;
	}

	ngOnInit(): void {
		this.getUsers();
	}

	getUsers(){
		this._userService.userList(this.token).subscribe(
			res => {
				if( res.status == 'success' ){
					this.users = res.users;
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log(<any>error);
			}
		);
	}

	deleteUser(id){
		this.status = undefined;
		this.responseMessage = undefined;
		let loader = document.getElementById('loader'+id);
		loader.style.display = 'block';
		
		this._userService.deleteUser(id, this.token).subscribe(
			res => {
				loader.style.display = 'none';
				if( res.status == 'success' ){
					this.status = res.status;
					this.responseMessage = res.message;
					this.getUsers();
				}
			},
			error => {
				loader.style.display = 'none';
				document.body.animate([{scrollTop:0}], {duration: 1000})
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log(<any>error);
			}
		);
	}

	pageChange(event){
		this.actualPage = event;
	}
}