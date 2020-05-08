import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/service.index';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styles: [],
	providers: [UserService]
})
export class HeaderComponent implements OnInit {
	public page_title: string;

	public identity: any;

	constructor(
		private _userService: UserService
	) {
		this.page_title = 'Utilitario Subred Sur';

		this.identity = this._userService.getIdentity();
	}

	ngOnInit(): void {
	}

}
