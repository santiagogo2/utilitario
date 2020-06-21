import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// Services
import { LocationService, UserService } from 'src/app/services/service.index';

// Models
import { Location } from 'src/app/models/model.index';

@Component({
	selector: 'app-location-list',
	templateUrl: './location-list.component.html',
	styles: [],
	providers:[
		LocationService,
		UserService,
	]
})
export class LocationListComponent implements OnInit {
	@Output() public changeView: EventEmitter<any> = new EventEmitter();
	public status: string;
	public responseMessage: string;
	public actualPage: number;
	public itemsPerPage: number;

	public token: string;
	public locations: Location[];

	constructor(
		private _locationService: LocationService,
		private _userService: UserService,
	) {
		this.actualPage = 1;
		this.itemsPerPage = 7;

		this.token = this._userService.getToken();
	}

	ngOnInit(): void {
		this.locationsList();
	}

	locationsList(){
		this._locationService.locationsList( this.token ).subscribe(
			res => {
				if( res.status == 'success' ){
					this.locations = res.locations;
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log(<any>error);
			}
		);
	}

	deleteLocation(id){
		this.status = undefined;
		this.responseMessage = undefined;

		let loader = document.getElementById('loaderLocation' + id);

		loader.style.display = 'block';

		this._locationService.deleteLocation( id, this.token ).subscribe(
			res => {
				loader.style.display = 'none';
				
				if( res.status == 'success' ){
					this.status = res.status;
					this.responseMessage = res.message;
					this.locationsList();
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

	sendFlag(event, editId=null){
		if( editId ) localStorage.setItem( 'locationEditId', editId );
		this.changeView.emit(event);
	}
}
