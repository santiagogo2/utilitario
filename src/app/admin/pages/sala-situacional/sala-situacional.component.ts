import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-sala-situacional',
	templateUrl: './sala-situacional.component.html',
	styles: []
})
export class SalaSituacionalComponent implements OnInit {
	public areaStatusView: string;
	public profileStatusView: string;
	public unitStatusView: string;

	constructor() {
		let getInfo = localStorage.getItem('areaStatusView');
		if( getInfo ) this.areaStatusView = getInfo;
		else this.areaStatusView = 'Listar';

		getInfo = localStorage.getItem('profileStatusView');
		if( getInfo ) this.profileStatusView = getInfo;
		else this.profileStatusView = 'Listar';

		getInfo = localStorage.getItem('unitStatusView');
		if( getInfo ) this.unitStatusView = getInfo;
		else this.unitStatusView = 'Listar';
	}

	ngOnInit(): void {
	}

	chageAreaView(result){
		this.areaStatusView = result;
		localStorage.setItem( 'areaStatusView', result );
	}

	chageProfileView(result){
		this.profileStatusView = result;
		localStorage.setItem( 'profileStatusView', result );
	}

	chageUnitView(result){
		this.unitStatusView = result;
		localStorage.setItem( 'unitStatusView', result );
	}
}
