import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styles: []
})
export class HomeComponent implements OnInit {
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
