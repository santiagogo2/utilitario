import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../../services/service.index';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

	constructor(
		private _userService: UserService,
		private _router: Router
	){}

	canActivate(){
		let identity = this._userService.getIdentity();

		if(identity && identity.role == 'ADMIN_ROLE'){
			return true;
		} else{
			this._router.navigate(['/sala-situacional']);
			return false;
		}
	} 
}
