import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';

// Services
import { UserService } from '../../../../services/service.index';

// Models
import { User } from '../../../../models/model.index';

@Component({
	selector: 'app-user-password-edit',
	templateUrl: './user-password-edit.component.html',
	styles: [],
	providers: [
		UserService
	]
})
export class UserPasswordEditComponent implements OnInit {
	public password: string;
	public passwordEye: any;
	public passwordConfirmEye: any;
	public passwordType: string;
	public passwordConfirmType: string;
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public enabled: boolean;
	public enabledPassword: boolean;
	public passwordText: string;
	public buttonText: string;

	public token: string;
	public identity: any;
	public user: User;

	constructor(
		private _userService: UserService,
		private _router: Router,
		private _route: ActivatedRoute,
	) {
		this.passwordEye = faEye;
		this.passwordConfirmEye = faEye;
		this.passwordType = 'password';
		this.passwordConfirmType = 'password';
		this.enabled = true;
		this.enabledPassword = false;
		this.buttonText = 'Actualizar Contraseña';
		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
	}

	ngOnInit(): void {
		this.getUser();
	}

	onSubmit( userPasswordEditRegisterForm ){
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this._userService.updateUser( this.user, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if( res.status == 'success' ){
					swal('Contraseña Actualizada', res.message, 'success');
					this._router.navigate(['/inicio']);
					userPasswordEditRegisterForm.reset();
				}
			},
			error => {
				this.preloaderStatus = false;
				this.responseMessage = error.error.message;

				if(error.error.errors){
					this.responseMessage = this.responseMessage + '. ' + JSON.stringify(error.error.errors);
				}

				this.status = 'error';
				swal('Error', this.responseMessage, 'error');
				console.log(<any>error);
			}
		);
	}

	getUser(){
		this.status = undefined;
		this.responseMessage = undefined

		this._userService.getUser( this.identity.sub, this.token ).subscribe(
			res => {
				if( res.status == 'success' ){
					this.user = res.user;
				}
			},
			error => {
				this.status = 'error';
				this.responseMessage = error.error.message;
				console.log(<any>error);
			}
		);
	}

	showPassword( name:string ){
		if(name == 'userPassword'){
			if(this.passwordType == 'password'){
				this.passwordType = 'text';
				this.passwordEye = faEyeSlash;
			}
			else{
				this.passwordType = 'password';
				this.passwordEye = faEye;
			}			
		} else if( name == 'passwordConfirm' ){
			if(this.passwordConfirmType == 'password'){
				this.passwordConfirmType = 'text';
				this.passwordConfirmEye = faEyeSlash;
			}
			else{
				this.passwordConfirmType = 'password';
				this.passwordConfirmEye = faEye;
			}
		}
	}
}
