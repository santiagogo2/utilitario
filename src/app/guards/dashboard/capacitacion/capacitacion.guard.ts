import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

// Services
import { UserService } from '../../../services/service.index';
import { element } from 'protractor';


@Injectable({
	providedIn: 'root'
})
export class CapacitacionGuard implements CanActivate {
	constructor(
		private _userService: UserService,
		private _router: Router,
	){}

	canActivate(){
		let permissions = this._userService.getPermissions();
		if( !permissions ) {
			this._router.navigate(['/inicio']);
			return false;
		}

		for ( let i = 0; i < permissions.length; i++ ){
			if( permissions[i].id_operations == 1 ){
				return true;
			}
		}
		this._router.navigate(['/inicio']);
		return false;
	}  
}
