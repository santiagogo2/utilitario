import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// Services
import { LocationService, UserService } from 'src/app/services/service.index';

// Models
import { Location } from 'src/app/models/model.index';

@Component({
	selector: 'app-location-register',
	templateUrl: './location-register.component.html',
	styles: [],
	providers:[
		LocationService,
		UserService,
	]
})
export class LocationRegisterComponent implements OnInit {
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
		this.buttonText = 'Registrar';

		this.token = this._userService.getToken();
		this.location = new Location(null,null);
	}

	ngOnInit(): void {
	}

	onSubmit(locationRegisterForm){
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this._locationService.newLocation( this.location, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if( res.status == 'success' ){
					this.status = res.status;
					this.responseMessage = res.message;
					locationRegisterForm.reset();
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
