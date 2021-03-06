import { Component, OnInit } from '@angular/core';

// Services
import { UserService } from '../../services/service.index';

@Component({
	selector: 'app-epp',
	templateUrl: './epp.component.html',
	styles: [],
	providers: [
		UserService,
	]
})
export class EppComponent implements OnInit {
	public identity: any;

	public epp: any[] = [
		{ titulo: 'Seguimiento', url: 'seguimiento/listar', class: 'imageContainer color-green', imageUrl: 'assets/images/EPP/seguimiento.png' },
		{ titulo: 'Informes', url: 'informes', class: 'imageContainer color-violet', imageUrl: 'assets/images/EPP/informes.png' }
	]

	constructor(
		private _userService: UserService
	) {}

	ngOnInit(): void {
	}
}
