import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class SidebarService {

	public menu: any[] = [
		{
			titulo: 'Principal',
			icono: 'mdi mdi-gauge',
			submenu: [
				{ titulo: 'Dashboard', url: '/dashboard' },
				{ titulo: 'ProgressBar', url: '/progress' },
				{ titulo: 'Gráficas', url: '/graficas1' },
				{ titulo: 'Promesas', url: '/promesas' },
				{ titulo: 'rxjs', url: '/rxjs' }
			]
		}
	]

	constructor() { }
}
