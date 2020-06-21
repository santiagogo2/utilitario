import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocationService, UserService } from 'src/app/services/service.index';
import { Location } from 'src/app/models/model.index';

@Component({
	selector: 'app-location-edit',
	templateUrl: '../location-register/location-register.component.html',
	styles: [],
	providers:[
		LocationService,
		UserService,
	]
})
export class LocationEditComponent implements OnInit {
	@Output() public changeView: EventEmitter<string> = new EventEmitter;

	public status: string;
	public responseMessage: string;
	public buttonText: string;
	public preloaderStatus: boolean;

	public token: string;
	public location: Location;

	constructor(
		private _locationService: LocationService,
		private _userService: UserService,
	) {
		this.buttonText = 'Actualizar';

		this.token = this._userService.getToken();
	}

	ngOnInit(): void {
		this.getLocation();
	}

	getLocation(){
		this.status = undefined;
		this.responseMessage = undefined;
		this.location = undefined;

		let id = localStorage.getItem( 'locationEditId' );

		this._locationService.getLocation( id, this.token ).subscribe(
			res => {
				if( res.status == 'success' ){
					this.location = res.location;
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;				
				console.log(<any>error);
			}
		);
	}

	onSubmit(locationEditForm){
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this._locationService.updateLocation( this.location, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if( res.status == 'success' ){
					this.sendFlag();
				}
			},
			error => {
				this.preloaderStatus = false;
				this.status = error.error.status;
				this.responseMessage = error.error.message;

				if(error.error.errors){
					this.responseMessage = this.responseMessage + '. ' + JSON.stringify(error.error.errors);
				}

				console.log(<any>error);
			}
		);
	}

	upperCase($event){
		$event = $event ? $event.toUpperCase().trim():$event;
		return $event;
	}

	sendFlag(){
		this.changeView.emit('Listar');
	}
}
