import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// Services
import { ProfileService, UserService } from '../../../../../services/service.index';

// Models
import { Profile } from '../../../../../models/model.index';

@Component({
	selector: 'app-profile-register',
	templateUrl: './profile-register.component.html',
	styles: [],
	providers: [
		ProfileService,
		UserService
	]
})
export class ProfileRegisterComponent implements OnInit {
	@Output() public changeProfileView: EventEmitter<any> = new EventEmitter();

	public status: string;
	public responseMessage: string;
	public buttonText: string;
	public preloaderStatus: boolean;

	public token: string;
	public profile: Profile;

	constructor(
		private _profileService: ProfileService,
		private _userService: UserService
	) {
		this.buttonText = 'Registrar';

		this.token = this._userService.getToken();
		this.profile = new Profile(null, null);
	}

	ngOnInit(): void {
	}

	onSubmit(profileRegisterForm){
		this.status = undefined;
		this.responseMessage = undefined;

		this.profile.name = this.profile.name.toUpperCase().trim();

		this._profileService.newProfile( this.profile, this.token ).subscribe(
			res => {
				if( res.status == 'success' ){
					this.status = res.status;
					this.responseMessage = res.message;
					profileRegisterForm.reset();
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
