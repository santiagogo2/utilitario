import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../../../services/service.index';

@Injectable({
	providedIn: 'root'
})
export class ContratacionGuard implements CanActivate {
	constructor(
		private _userService: UserService,
		private _router: Router
	){}

	canActivate(){
		let identity = this._userService.getIdentity();
		let stringSplit = identity.role.split('_');
		let isContract = stringSplit[1];

		if(identity.role == 'ADMIN_ROLE' || isContract == 'CONTRATACION'){
			return true;
		} else{
			this._router.navigate(['/inicio']);
			return false;
		}
	} 
  
}
