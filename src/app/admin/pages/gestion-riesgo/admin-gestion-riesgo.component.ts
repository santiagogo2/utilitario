import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-admin-gestion-riesgo',
	templateUrl: './admin-gestion-riesgo.component.html',
	styles: []
})
export class AdminGestionRiesgoComponent implements OnInit {
	public upgdStatusView: string;
	public locationStatusView: string;
	public upzStatusView: string;

	constructor() {
		let getInfo = localStorage.getItem('upgdStatusView');
		this.upgdStatusView = getInfo ? getInfo : 'Listar';
		
		getInfo = localStorage.getItem('locationStatusView');
		this.locationStatusView = getInfo ? getInfo : 'Listar';
		
		getInfo = localStorage.getItem('upzStatusView');
		this.upzStatusView = getInfo ? getInfo : 'Listar';
	}

	ngOnInit(): void {
	}

	changeUpgdView(result){
		this.upgdStatusView = result;
		localStorage.setItem('upgdStatusView', result);
	}

	changeLocationView(result){
		this.locationStatusView = result;
		localStorage.setItem('locationStatusView', result);
	}

	changeUpzView(result){
		this.upzStatusView = result;
		localStorage.setItem('upzStatusView', result);
	}
}
