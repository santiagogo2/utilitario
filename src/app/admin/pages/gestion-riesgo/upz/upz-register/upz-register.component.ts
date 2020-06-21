import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// Services
import { UpzService, UserService, LocationService } from 'src/app/services/service.index';

// Models
import { Upz, Location } from 'src/app/models/model.index';

@Component({
	selector: 'app-upz-register',
	templateUrl: './upz-register.component.html',
	styles: [],
	providers:[
		LocationService,
		UpzService,
		UserService,
	]
})
export class UpzRegisterComponent implements OnInit {
	@Output() public changeView: EventEmitter<string> = new EventEmitter;
	
	public status: string;
	public responseMessage: string;
	public buttonText: string;
	public preloaderStatus: boolean;

	public token: string;
	public upz: Upz;
	public locations: Location[];

	constructor(
		private _locationService: LocationService,
		private _upzService: UpzService,
		private _userService: UserService,
	) {
		this.buttonText = 'Registrar';

		this.token = this._userService.getToken();
		this.upz = new Upz(null,null,null);
	}

	ngOnInit(): void {
		this.locationsList();
	}

	onSubmit(upzRegisterForm){
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this._upzService.newUpz( this.upz, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if( res.status == 'success' ){
					this.status = res.status;
					this.responseMessage = res.message;
					upzRegisterForm.reset();
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

	locationsList(){
		this.status = undefined;
		this.responseMessage = undefined;

		this._locationService.locationsList(this.token).subscribe(
			res => {
				if( res.status == 'success' ){
					let locations = res.locations;
					for(let i=0; i<locations.length; i++){
						if(locations[i].name == 'OTRAS') locations.splice( i,1 );
					}
					this.locations = locations;
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;				
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

