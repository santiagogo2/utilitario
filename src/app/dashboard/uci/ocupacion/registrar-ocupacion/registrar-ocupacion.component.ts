import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert';

// Services
import { OccupationService, UnitService, UserService } from '../../../../services/service.index';

// Models
import { Occupation, Unit } from '../../../../models/model.index';

@Component({
	selector: 'app-registrar-ocupacion',
	templateUrl: './registrar-ocupacion.component.html',
	styles: [],
	providers: [
		OccupationService,
		UnitService,
		UserService
	]
})
export class RegistrarOcupacionComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public buttonText: string;
	public actualDate: any;

	public token: string;
	public occupation: Occupation;
	public units: Array<any>;

	public date: any;
	public day: any;
	public month: any;
	public year: any;

	constructor(
		private _occupationService: OccupationService,
		private _unitService: UnitService,
		private _userService: UserService,
		private _router: Router,
	) {
		this.buttonText = 'Registrar';
		
		this.token = this._userService.getToken();
	}

	ngOnInit(): void {
		this.setActualDate();
		this.unitList();
	}

	onSubmit(occupationRegisterForm){
		this.status = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this._occupationService.newOccupation( this.occupation, this.token ).subscribe(
			res => {
				this.preloaderStatus = false;
				if( res.status == 'success' ){
					swal('Registro exitoso', res.message, 'success');
					occupationRegisterForm.reset();
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

	unitList(){
		this.status = undefined;
		this.responseMessage = undefined;

		this._unitService.unitList( this.token ).subscribe(
			res => {
				if( res.status == 'success' ){
					this.units = res.units;
					this.occupation = new Occupation(null,this.year+'-'+this.month+'-'+this.day,110013029401,null,null,null,null,17);
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log( <any> error );
			}
		);
	}

	setActualDate(){
		this.date = new Date();
		this.day = this.addZero(this.date.getDate());
		this.month = this.date.getMonth()+1;
		this.month = this.addZero(this.month);
		this.year = this.date.getFullYear();
	}

	addZero(number){
		if( number < 10 ){
			number = '0' + number.toString();
		}
		return number;
	}
}
