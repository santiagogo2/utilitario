import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// Services
import { SpendingCoordinatorService, UserService } from '../../../../../services/service.index';

// Models
import { SpendingCoordinator } from '../../../../../models/model.index';

@Component({
	selector: 'app-spending-list',
	templateUrl: './spending-list.component.html',
	styles: [],
	providers: [
		SpendingCoordinatorService,
		UserService,
	]
})
export class SpendingListComponent implements OnInit {
	@Output() public changeView: EventEmitter<string> = new EventEmitter;

	public status: string;
	public responseMessage: string;
	public actualPage: number;
	public itemsPerPage: number;

	public token: string;
	public spendingCoordinators: SpendingCoordinator[];

	constructor(
		private _spendingCoordinatorService: SpendingCoordinatorService,
		private _userService: UserService
	) {
		this.actualPage = 1;
		this.itemsPerPage = 7;

		this.token = this._userService.getToken();
	}

	ngOnInit(): void {
		this.spendingCoordinatorList();
	}

	spendingCoordinatorList(){
		this.status = undefined;
		this.responseMessage = undefined;

		this._spendingCoordinatorService.spendingCoordinatorList( this.token ).subscribe(
			res => {
				if( res.status == 'success' ){
					this.spendingCoordinators = res.spendings;
				}
			},
			error => {
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log(<any>error);
			}
		);
	}

	deleteSpendingCoordinator(id){
		this.status = undefined;
		this.responseMessage = undefined;

		let loader = document.getElementById('loaderSpending' + id);

		loader.style.display = 'block';

		this._spendingCoordinatorService.deleteSpendingCoordinator( id, this.token ).subscribe(
			res => {
				loader.style.display = 'none';
				
				if( res.status == 'success' ){
					this.status = res.status;
					this.responseMessage = res.message;
					this.spendingCoordinatorList();
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
		if( editId ) localStorage.setItem( 'spendingEditId', editId );
		this.changeView.emit(event);
	}
}
