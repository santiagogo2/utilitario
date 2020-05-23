import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// Services
import { ProfileService, UserService } from '../../../../../services/service.index';

// Models
import { Profile } from '../../../../../models/model.index';

@Component({
	selector: 'app-profile-list',
	templateUrl: './profile-list.component.html',
	styles: [],
	providers: [
		ProfileService,
		UserService
	]
})
export class ProfileListComponent implements OnInit {
	@Output() public changeProfileView: EventEmitter<any> = new EventEmitter();
	public status: string;
	public responseMessage: string;
	public actualPage: number;
	public itemsPerPage: number;

	public token: string;
	public profiles: Profile[];

	constructor(
		private _profileService: ProfileService,
		private _userService: UserService
	) {
		this.actualPage = 1;
		this.itemsPerPage = 7;

		this.token = this._userService.getToken();
	}

	ngOnInit(): void {
		this.profileList();
	}

	profileList(){
		this._profileService.profileList( this.token ).subscribe(
			res => {
				if( res.status == 'success' ){
					this.profiles = res.profiles;
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log(<any>error);
			}
		);
	}

	deleteProfile(id){
		this.status = undefined;
		this.responseMessage = undefined;
		let loader = document.getElementById('loader'+id);

		loader.style.display = 'block';

		this._profileService.deleteProfile( id, this.token ).subscribe(
			res => {
				loader.style.display = 'none';
				
				if( res.status == 'success' ){
					this.status = res.status;
					this.responseMessage = res.message;
					console.log(this.status, this.responseMessage);
					this.profileList();
				}
			},
			error => {
				loader.style.display = 'none';
				document.body.animate([{scrollTop:0}], {duration: 1000});

				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log( <any>error );
			}
		);
	}

	pageChange(event){
		this.actualPage = event;
	}

	sendFlag(event){
		this.changeProfileView.emit(event);
	}
}
