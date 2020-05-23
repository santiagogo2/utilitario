import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// Services
import { ProfileService, UserService } from '../../../../../services/service.index';

// Models
import { Profile } from '../../../../../models/model.index';

@Component({
	selector: 'app-profile-edit',
	templateUrl: '../profile-register/profile-register.component.html',
	styles: [],
	providers: [
		ProfileService,
		UserService
	]
})
export class ProfileEditComponent implements OnInit {
	@Output() public changeProfileView: EventEmitter<any> = new EventEmitter();

	public status: string;
	public responseMessage: string;
	public buttonText: string;
	public preloaderStatus: boolean;

	public token: string;
	public profile: Profile;

	constructor(
		private _profileServie: ProfileService,
		private _userService: UserService,
		private _route: ActivatedRoute
	) {
		this.buttonText = 'Actualizar';

		this.token = this._userService.getToken();
	}

	ngOnInit(): void {
		this.getProfile();
	}

	getProfile(){
		this._route.params.subscribe( params => {
			this.status = undefined;
			this.responseMessage = undefined;
			this.profile = undefined;

			let id = +params['id'];

			this._profileServie.getProfile( id , this.token ).subscribe(
				res => {
					if( res.status == 'success' ){
						this.profile = res.profile;
					}
				},
				error => {
					this.status = error.error.status;
					this.responseMessage = error.error.message;
					console.log(<any>error);
				}
			);
		});
	}

	onSubmit(profileUpdateForm){
		this.status = undefined;
		this.responseMessage = undefined;

		this.profile.name = this.profile.name.toUpperCase().trim();

		this._profileServie.updateProfile( this.profile, this.token ).subscribe(
			res => {
				if( res.status == 'success' ){
					this.sendFlag();
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log(<any>error);
			}
		);
	}

	sendFlag(){
		this.changeProfileView.emit('Listar');
	}
}
