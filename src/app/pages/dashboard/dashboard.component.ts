import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styles: []
})
export class DashboardComponent implements OnInit {
	public preloaderImage: boolean;

	constructor() {
		this.preloaderImage = true;
	}

	ngOnInit(): void {
	}

	prueba(){
		alert('aja');
	}
}
