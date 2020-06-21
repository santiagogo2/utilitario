import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

// Services
import { UserService } from '../../../../services/service.index';


@Injectable({
	providedIn: 'root'
})
export class GestionRiesgoCasoListGuard implements CanActivate {
	constructor(
		private _userService: UserService,
		private _router: Router,
	){}

	canActivate(){
		let identity = this._userService.getIdentity();

		if(identity.role == 'ADMIN_ROLE' || identity.role == 'ADMIN_GESTION_RIESGO_ROLE' || identity.role == 'USER_GESTION_RIESGO_ROLE'){
			return true;
		} else {
			this._router.navigate(['/gestion-riesgo']);
			return false;
		}
	}  
}
