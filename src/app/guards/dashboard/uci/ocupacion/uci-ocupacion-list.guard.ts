import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

// Services
import { UserService } from '../../../../services/service.index';

@Injectable({
	providedIn: 'root'
})
export class UciOcupacionListGuard implements CanActivate {
	constructor(
		private _userService: UserService,
		private _router: Router,
	){}

	canActivate(){
		let identity = this._userService.getIdentity();

		if(identity.role == 'ADMIN_ROLE' || identity.role == 'USER_UCI_ROLE'){
			return true;
		} else {
			this._router.navigate(['/uci']);
			return false;
		}
	}  
}
