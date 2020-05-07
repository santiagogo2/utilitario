import { Routes, RouterModule } from '@angular/router';

// Components
import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SalaSituacionalComponent } from './sala-situacional/sala-situacional.component';
import { ColaboradoresComponent } from './sala-situacional/colaboradores/colaboradores.component';

const pagesRoutes: Routes = [
	{
		path: '',
		component: PagesComponent,
		children: [
			{ path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
			{ path: 'sala-situacional', component: SalaSituacionalComponent, data: { titulo: 'Sala Situacional' } },
			{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
		]		
	},
	{
		path: 'sala-situacional',
		component: PagesComponent,
		children: [
			{ path: 'colaboradores', component: ColaboradoresComponent, data: { titulo: 'Colaboradores' } },
		]		
	}
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );