import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import swal from 'sweetalert';

// Services
import { OccupationService, UnitService, UserService } from '../../../../services/service.index';

// Models

@Component({
	selector: 'app-editar-ocupacion',
	templateUrl: '../registrar-ocupacion/registrar-ocupacion.component.html',
	styles: [],
	providers: [
		OccupationService,
		UnitService,
		UserService,
	]
})
export class EditarOcupacionComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public buttonText: string;
	public actualDate: any;

	public token: string;
	public occupation: any;
	public units: any;

	public date: any;
	public day: any;
	public month: any;
	public year: any;

	constructor(
		private _occupationService: OccupationService,
		private _unitService: UnitService,
		private _userService: UserService,
		private _router: Router,
		private _route: ActivatedRoute,
	) {
		this.buttonText = 'Actualizar';
		
		this.token = this._userService.getToken();
	}

	ngOnInit(): void {
		this._route.params.subscribe( params => {
			this.status = undefined;
			this.responseMessage = undefined;

			let id = +params['id'];

			Promise.all([this.unitList(), this.getOccupation(id)])
				   .then( responses => {
				   		this.units = responses[0];
				   		this.occupation = responses[1];
				   })
				   .catch( error => {
				   		this.status = 'error';
				   		this.responseMessage = error;
				   })

		});
	}

	onSubmit(occupationEditForm){
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this._occupationService.updateOccupation( this.occupation, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if( res.status == 'success' ){
					swal('Actualización exitosa', res.message, 'success');
					this._router.navigate(['/uci/ocupacion/listar']);
				}
			},
			error => {
				this.preloaderStatus = false;
				this.status = error.error.status;
				this.responseMessage = error.error.message;				

				if(error.error.errors){
					this.responseMessage = this.responseMessage + '. ' + JSON.stringify(error.error.errors);
				}

				swal('Error', this.responseMessage, 'error');
				console.log(<any>error);
			}
		);
	}

	//==========================================================================
	//================================Promises==================================
	//==========================================================================
	unitList(){
		return new Promise((resolve, reject) => {
			this._unitService.unitList( this.token ).subscribe(
				res => {
					if( res.status == 'success' ){
						resolve( res.units );
					}
				},
				error => {
					reject( error.error.message );
					console.log(<any>error);
				}
			);
		});
	}

	getOccupation(id){
		return new Promise((resolve, reject) => {
			this._occupationService.getOccupation( id, this.token ).subscribe(
				res => {
					if( res.status == 'success' ){
						resolve( res.occupation );
					}
				},
				error => {
					reject( error.error.message );
					console.log(<any>error);
				}
			);
		});
	}
}
