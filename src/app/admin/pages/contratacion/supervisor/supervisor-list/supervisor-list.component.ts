import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// Services
import { SupervisorService, UserService } from '../../../../../services/service.index';

// Models
import { Supervisor } from '../../../../../models/model.index';

@Component({
	selector: 'app-supervisor-list',
	templateUrl: './supervisor-list.component.html',
	styles: [],
	providers: [
		SupervisorService,
		UserService
	]
})
export class SupervisorListComponent implements OnInit {
	@Output() public changeView: EventEmitter<any> = new EventEmitter();
	public status: string;
	public responseMessage: string;
	public actualPage: number;
	public itemsPerPage: number;

	public token: string;
	public supervisors: Supervisor[];

	constructor(
		private _supervisorService: SupervisorService,
		private _userService: UserService,
	) {
		this.actualPage = 1;
		this.itemsPerPage = 10;

		this.token = this._userService.getToken();
	}

	ngOnInit(): void {
		this.supervisorList();
	}

	supervisorList(){
		this.status = undefined;
		this.responseMessage = undefined;

		this._supervisorService.supervisorList( this.token ).subscribe(
			res => {
				if( res.status == 'success' ){
					this.supervisors = res.supervisors;
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log(<any>error);
			}
		);
	}

	deleteSupervisor(id){
		this.status = undefined;
		this.responseMessage = undefined;

		let loader = document.getElementById('loader' + id);

		loader.style.display = 'block';

		this._supervisorService.deleteSupervisor( id, this.token ).subscribe(
			res => {
				loader.style.display = 'none';
				
				if( res.status == 'success' ){
					this.status = res.status;
					this.responseMessage = res.message;
					this.supervisorList();
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
		if( editId == 0 ) editId = 'zero';
		if( editId ) localStorage.setItem( 'supervisorEditId', editId );
		this.changeView.emit(event);
	}
}
