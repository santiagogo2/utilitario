import { Routes, RouterModule } from '@angular/router';

// Components
import { DashboardComponent } from './dashboard.component';

import { HomeComponent } from './home/home.component';
import { SalaSituacionalComponent } from './sala-situacional/sala-situacional.component';
import { RegistrarColaboradoresComponent } from './sala-situacional/colaboradores/registrar-colaboradores/registrar-colaboradores.component';
import { ListarColaboradoresComponent } from './sala-situacional/colaboradores/listar-colaboradores/listar-colaboradores.component';
import { EditarColaboradoresComponent } from './sala-situacional/colaboradores/editar-colaboradores/editar-colaboradores.component';
import { RelacionarColaboradoresComponent } from './sala-situacional/colaboradores/relacionar-colaboradores/relacionar-colaboradores.component';
import { InformesComponent } from './sala-situacional/informes/informes.component';

// Services

// Guards
import { IdentityGuard, ReporstGuard } from '../guards/guard.index';

const pagesRoutes: Routes = [
	{
		path: '',
		component: DashboardComponent,
		children: [
			{ path: 'dashboard', component: HomeComponent, data: { titulo: 'Dashboard' }, canActivate: [IdentityGuard] },
			{ path: 'sala-situacional', component: SalaSituacionalComponent, data: { titulo: 'Sala Situacional' }, canActivate: [IdentityGuard] },
			{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
		]		
	},
	{
		path: 'sala-situacional',
		component: DashboardComponent,
		children: [
			{ path: 'colaboradores/listar', component: ListarColaboradoresComponent, data: { titulo: 'Listar Colaboradores' }, canActivate: [IdentityGuard, ReporstGuard] },
			{ path: 'colaboradores/registrar', component: RegistrarColaboradoresComponent, data: { titulo: 'Registrar Colaborador' }, canActivate: [IdentityGuard, ReporstGuard] },
			{ path: 'colaboradores/editar/:id', component: EditarColaboradoresComponent, data: { titulo: 'Editar Colaborador' }, canActivate: [IdentityGuard, ReporstGuard] },
			{ path: 'colaboradores/relacionar/:id', component: RelacionarColaboradoresComponent, data: { titulo: 'Relacionar Colaborador' }, canActivate: [IdentityGuard, ReporstGuard] },

			{ path: 'informes', component: InformesComponent, data: { titulo: 'Informes' }, canActivate: [IdentityGuard] },
		]		
	}
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );