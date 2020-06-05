import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-contratacion',
	templateUrl: './contratacion.component.html',
	styles: []
})
export class ContratacionComponent implements OnInit {
	public supervisorStatusView: string;
	public spendingStatusView: string;

	constructor() {
		let getInfo = localStorage.getItem('supervisorStatusView');
		if( getInfo ) this.supervisorStatusView = getInfo;
		else this.supervisorStatusView = 'Listar';

		if( getInfo ) this.spendingStatusView = getInfo;
		else this.spendingStatusView = 'Listar';
	}

	ngOnInit(): void {
	}

	changeSupervisorView(result){
		this.supervisorStatusView = result;
		localStorage.setItem( 'supervisorStatusView', result );
	}

	chageSpendingCoordinatorView(result){
		this.spendingStatusView = result;
		localStorage.setItem( 'spendingStatusView', result );		
	}
}
