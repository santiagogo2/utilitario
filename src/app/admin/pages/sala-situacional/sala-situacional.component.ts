import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-sala-situacional',
	templateUrl: './sala-situacional.component.html',
	styles: []
})
export class SalaSituacionalComponent implements OnInit {
	public areaStatusView: string;

	constructor() {
		let getInfo = localStorage.getItem('areaStatusView');
		if( getInfo ) this.areaStatusView = getInfo;
		else this.areaStatusView = 'Listar';
	}

	ngOnInit(): void {
	}

	chageAreaView(result){
		this.areaStatusView = result;
		localStorage.setItem( 'areaStatusView', result );
	}
}
