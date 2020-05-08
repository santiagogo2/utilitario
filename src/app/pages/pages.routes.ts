import { Routes, RouterModule } from '@angular/router';

// Components
import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SalaSituacionalComponent } from './sala-situacional/sala-situacional.component';
import { RegistrarColaboradoresComponent } from './sala-situacional/colaboradores/registrar-colaboradores/registrar-colaboradores.component';
import { ListarColaboradoresComponent } from './sala-situacional/colaboradores/listar-colaboradores/listar-colaboradores.component';
import { EditarColaboradoresComponent } from './sala-situacional/colaboradores/editar-colaboradores/editar-colaboradores.component';
import { RelacionarColaboradoresComponent } from './sala-situacional/colaboradores/relacionar-colaboradores/relacionar-colaboradores.component';

// Services
import { IdentityGuard } from '../guards/identity.guard';

const pagesRoutes: Routes = [
	{
		path: '',
		component: PagesComponent,
		children: [
			{ path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' }, canActivate: [IdentityGuard] },
			{ path: 'sala-situacional', component: SalaSituacionalComponent, data: { titulo: 'Sala Situacional' }, canActivate: [IdentityGuard] },
			{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
		]		
	},
	{
		path: 'sala-situacional',
		component: PagesComponent,
		children: [
			{ path: 'colaboradores/listar', component: ListarColaboradoresComponent, data: { titulo: 'Listar Colaboradores' }, canActivate: [IdentityGuard] },
			{ path: 'colaboradores/registrar', component: RegistrarColaboradoresComponent, data: { titulo: 'Registrar Colaborador' }, canActivate: [IdentityGuard] },
			{ path: 'colaboradores/editar/:id', component: EditarColaboradoresComponent, data: { titulo: 'Editar Colaborador' }, canActivate: [IdentityGuard] },
			{ path: 'colaboradores/relacionar/:id', component: RelacionarColaboradoresComponent, data: { titulo: 'Relacionar Colaborador' }, canActivate: [IdentityGuard] },
		]		
	}
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );