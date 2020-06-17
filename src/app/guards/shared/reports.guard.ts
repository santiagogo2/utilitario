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
		let arrayIdentity = identity.role.split('-');
		let pass: boolean = false;

		arrayIdentity.forEach( element => {
			if( element == 'INFORMES' || identity.role == 'USER_INFORMES_ROLE' ){
				pass = true;
			} else{
				pass = false;
			}
		});

		if(pass){
				this._router.navigate(['/sala-situacional']);
				return false;
		} else{
			return true;
		}
	} 
  
}
