import { Component, OnInit } from '@angular/core';

// Services
import { global, UserService, EppTrackingService, ProfileService, UnitService } from 'src/app/services/service.index';

// Models
import { EppTracking, Profile, Unit } from 'src/app/models/model.index';

@Component({
	selector: 'app-epp-informes',
	templateUrl: './epp-informes.component.html',
	styles: [],
	providers:[
		EppTrackingService,
		ProfileService,
		UnitService,
		UserService,
	]
})
export class EppInformesComponent implements OnInit {
	public responseMessage: string;
	public preloaderStatus: boolean;
	public token: string;
	public infoLoaded: boolean;

	public eppTracking: EppTracking[];
	public profiles: Profile[];
	public units: Unit[];
	public services: any;
	public epps: any;

	public eppProfile: any;
	public eppService: any;
	public eppType: any;
	public eppUnit: any;

	constructor(
		private _eppService: EppTrackingService,
		private _profileService: ProfileService,
		private _unitService: UnitService,
		private _userService: UserService,
	) {
		this.token = this._userService.getToken();

		this.services = global.services;
		this.epps = global.epps;
	}

	ngOnInit(): void {
		this.infoLoaded = false;
		this.responseMessage = undefined;

		Promise.all( [this.eppTrackingList(), this.profilesList(), this.unitList()] )
			   .then( resps => {
				   this.setGraphics();
				   this.infoLoaded = true;				   
				})
				.catch( error => {
					this.responseMessage = error;
				});
			}
			
	setGraphics(){
		this.eppProfile = this.setInfo('EPP por perfiles', 'bar', this.profiles, 'profiles_id');
		this.eppProfile.data = [ { data: this.eppProfile.data, label: 'EPP por perfil' } ];
		this.eppService = this.setInfo('EPP por servicios', 'doughnut', this.services, 'services_id');
		this.eppType = this.setInfo('EPP por tipo', 'pie', this.epps, 'epp_id');
		this.eppUnit = this.setInfo('EPP por unidad', 'bar', this.units, 'units_id');
		this.eppUnit.data = [ { data: this.eppUnit.data, label: 'EPP por unidad' } ];				
	}

	setInfo( title: string, type: string, array, key ){
		let labels = new Array();
		let data = new Array();
		let variable = {};

		let profileInfo = this.setLabels( array, labels, data, key);

		variable['title'] = title;
		variable['labels'] = profileInfo[0];
		variable['data'] = profileInfo[1];
		variable['type'] = type;

		return variable;
	}

	setLabels( array, labels, data, key ){
		array.forEach( element => {
			let cont = 0;
			let epp = this.eppTracking;
			
			for (let i = 0; i < epp.length; i++){
				if( element.id == epp[i][key] ) cont++;
			}

			if( cont > 0 ){
				labels.push( element.name );
				data.push( cont );
			}
		});
		return [labels, data];
	}

	//==========================================================================
	//================================Promises==================================
	//==========================================================================
	eppTrackingList(){
		return new Promise(( resolve, reject ) => {
			this._eppService.eppTrackingList( this.token ).subscribe(
				res => {
					if( res.status == 'success' ){
						this.eppTracking = res.epptracking;
						resolve('ok');
					}
				},
				error => {
					console.log( <any>error );
					reject( error.error.message );
				}
			);
		});
	}

	profilesList(){
		return new Promise(( resolve, reject ) => {
			this._profileService.profileList( this.token ).subscribe(
				res => {
					if( res.status == 'success' ){
						this.profiles = res.profiles;
						resolve('ok');
					}
				},
				error => {
					console.log( <any> error );
					reject( error.error.message );
				}
			);
		});
	}

	unitList(){
		return new Promise(( resolve, reject) => {
			this._unitService.unitList( this.token ).subscribe(
				res => {
					if( res.status == 'success' ){
						this.units = res.units;
						resolve('ok');
					}
				},
				error => {
					console.log( <any> error );
					reject( error.error.message );
				}
			);
		});
	}
}
