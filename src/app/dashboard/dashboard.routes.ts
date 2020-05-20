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

import { ContratacionComponent } from './contratacion/contratacion.component';
import { ListarContratoComponent } from './contratacion/contrato/listar-contrato/listar-contrato.component';
import { RegistrarContratoComponent } from './contratacion/contrato/registrar-contrato/registrar-contrato.component';

import { ListarContratistasComponent } from './contratacion/contratistas/listar-contratistas/listar-contratistas.component';
import { RegistrarContratistasComponent } from './contratacion/contratistas/registrar-contratistas/registrar-contratistas.component';
import { EditarContratistasComponent } from './contratacion/contratistas/editar-contratistas/editar-contratistas.component';

// Services

// Guards
import { IdentityGuard, ReporstGuard } from '../guards/guard.index';

const pagesRoutes: Routes = [
	{
		path: '',
		component: DashboardComponent,
		children: [
			{ path: 'dashboard', component: HomeComponent, data: { titulo: 'Dashboard' }, canActivate: [IdentityGuard] },
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
			{ path: '', component: SalaSituacionalComponent, data: { titulo: 'Sala Situacional' }, canActivate: [IdentityGuard] },
		]		
	},
	{
		path: 'contratacion',
		component: DashboardComponent,
		children: [
			{ path: 'contratos/listar', component: ListarContratoComponent, data: { titulo: 'Listar Contratos' }, canActivate: [IdentityGuard] },
			{ path: 'contratos/registrar', component: RegistrarContratoComponent, data: { titulo: 'Registrar Contratos' }, canActivate: [IdentityGuard] },
			
			{ path: 'contratistas/listar', component: ListarContratistasComponent, data: { titulo: 'Listar Contratistas' }, canActivate: [IdentityGuard] },
			{ path: 'contratistas/registrar', component: RegistrarContratistasComponent, data: { titulo: 'Registrar Contratista' }, canActivate: [IdentityGuard] },
			{ path: 'contratistas/editar/:id', component: EditarContratistasComponent, data: { titulo: 'Editar Contratista' }, canActivate: [IdentityGuard] },
			{ path: '', component: ContratacionComponent, data: { titulo: 'Contratación' }, canActivate: [IdentityGuard] },
		]		
	}
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );