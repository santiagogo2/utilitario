import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
	public prueba: any;
	public prueba2: any;

	constructor(
		private _router: Router
	) { }

	ngOnInit(): void {
	}

	onSubmit(){
		console.log('ingrese');
	}
}
