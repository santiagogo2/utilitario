import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../../services/service.index';

@Injectable({
	providedIn: 'root'
})
export class ReporstGuard implements CanActivate {
	constructor(
		private _userService: UserService,
		private _router: Router
	){}

	canActivate(){
		let identity = this._userService.getIdentity();

		if(identity.role == 'USER_SALA_SITUACIONAL_INFORMES_ROLE'){
			this._router.navigate(['/sala-situacional']);
			return false;
		} else{
			return true;
		}
	} 
  
}
