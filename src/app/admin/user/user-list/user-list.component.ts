import { Component, OnInit } from '@angular/core';

// Models
import { User } from '../../../models/user';

// Services
import { global, UserService } from '../../../services/service.index';

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
	public users: User[];

	constructor(
		private _userService: UserService
	) {
		this.token = this._userService.getToken();
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

	pageChange(event){
		this.actualPage = event;
	}
}
