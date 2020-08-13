import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CaseService, RoleOperationService, SampleService, UserService } from '../services/service.index';
import { User } from '../models/model.index';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	providers: [
		CaseService,
		RoleOperationService,
		SampleService,
		UserService,
	]
})
export class LoginComponent implements OnInit {
	public page_title: string;
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;

	public user: User;
	public token: string;
	public identity: any[];

	constructor(
		private _caseService: CaseService,
		private _roleOperationService: RoleOperationService,
		private _sampleService: SampleService,
		private _userService: UserService,
		private _router: Router,
		private _route: ActivatedRoute
	) {
		this.page_title = 'Utilitario Subred Sur';
		
		this.user = new User(null,null,null,null,null,null);
	}

	ngOnInit(): void {
		this.logout();
	}

	onSubmit(loginForm){
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this._userService.signup(this.user).subscribe(
			response => {
				if(response.status == 'success'){
					this.token = response.signup;

					// Objeto del usuario identificado
					this._userService.signup(this.user, true).subscribe(
						response => {
							this.preloaderStatus = false;

							if(response.status == 'success'){
								this.identity = response.signup;

								localStorage.setItem('utilitarioToken', this.token);
								localStorage.setItem('utilitarioIdentity', JSON.stringify(this.identity));
								let expirationtime = (12*60*60*1000) + new Date().getTime();
								localStorage.setItem('utilitarioExpiration', expirationtime.toString());

								this._roleOperationService.getOperationsByRole( response.signup.role_id, this.token ).subscribe(
									res => {
										localStorage.setItem( 'userOperations', JSON.stringify( res.rolesoperations ) );
									}
								);

								loginForm.reset();
								this._router.navigate(['/inicio']);
							}
						},
						error => {
							this.preloaderStatus = false;
							this.status = error.error.status;
							this.responseMessage = error.error.message;
							console.log(<any>error);
						}
					);					
				}

			},
			error => {
				this.preloaderStatus = false;
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log(<any>error);
			}
		);
	}

	logout(){
		this._route.params.subscribe(params => {
			let logout = +params['sure'];

			if(logout == 1){
				let document = localStorage.getItem('loadedDocument');
				if( document ) this._sampleService.deleteFile( document, this._userService.getToken() ).subscribe();
				document = localStorage.getItem('caseLoadedDocument');
				if( document ) this._caseService.deleteFile( document, this._userService.getToken() ).subscribe();
				localStorage.clear();
				this.token = null;
				this.identity = null;

				// Redirección al inicio
				this._router.navigate(['/login']);
			}
		});
	}
}
