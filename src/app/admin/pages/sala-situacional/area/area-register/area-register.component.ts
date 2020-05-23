import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// Services
import { AreaService, UserService } from '../../../../../services/service.index';

// Models
import { Area } from '../../../../../models/model.index';

@Component({
	selector: 'app-area-register',
	templateUrl: './area-register.component.html',
	styles: [],
	providers: [
		AreaService,
		UserService
	]
})
export class AreaRegisterComponent implements OnInit {
	@Output() public changeView: EventEmitter<any> = new EventEmitter();

	public status: string;
	public responseMessage: string;
	public buttonText: string;
	public preloaderStatus: boolean;

	public token: string;
	public area: Area;

	constructor(
		private _areaService: AreaService,
		private _userService: UserService
	) {
		this.buttonText = 'Registrar';

		this.token = this._userService.getToken();
		this.area = new Area(null, null);
	}

	ngOnInit(): void {
	}

	onSubmit(areaRegisterForm){
		this.status = undefined;
		this.responseMessage = undefined;

		this.area.name = this.area.name.toUpperCase().trim();

		this._areaService.newArea( this.area, this.token ).subscribe(
			res => {
				if( res.status == 'success' ){
					this.status = res.status;
					this.responseMessage = res.message;
					areaRegisterForm.reset();
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
		this.changeView.emit('Listar');
	}
}
