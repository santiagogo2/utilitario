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
import { EditarContratoComponent } from './contratacion/contrato/editar-contrato/editar-contrato.component';

import { ListarContratistasComponent } from './contratacion/contratistas/listar-contratistas/listar-contratistas.component';
import { RegistrarContratistasComponent } from './contratacion/contratistas/registrar-contratistas/registrar-contratistas.component';
import { EditarContratistasComponent } from './contratacion/contratistas/editar-contratistas/editar-contratistas.component';

// Services

// Guards
import { ContratacionGuard, IdentityGuard, ReporstGuard, SalaSituacionalGuard } from '../guards/guard.index';

const pagesRoutes: Routes = [
	{
		path: '',
		component: DashboardComponent,
		children: [
			{ path: 'inicio', component: HomeComponent, data: { titulo: 'Inicio' }, canActivate: [IdentityGuard] },
			{ path: '', redirectTo: '/inicio', pathMatch: 'full' },
		]		
	},
	{
		path: 'sala-situacional',
		component: DashboardComponent,
		canActivate: [IdentityGuard, SalaSituacionalGuard],
		children: [
			{ path: 'colaboradores', redirectTo: 'colaboradores/listar', pathMatch: 'full' },
			{ path: 'colaboradores/listar', component: ListarColaboradoresComponent, data: { titulo: 'Listar Colaboradores' }, canActivate: [ReporstGuard] },
			{ path: 'colaboradores/registrar', component: RegistrarColaboradoresComponent, data: { titulo: 'Registrar Colaborador' }, canActivate: [ReporstGuard] },
			{ path: 'colaboradores/editar/:id', component: EditarColaboradoresComponent, data: { titulo: 'Editar Colaborador' }, canActivate: [ReporstGuard] },
			{ path: 'colaboradores/relacionar/:id', component: RelacionarColaboradoresComponent, data: { titulo: 'Relacionar Colaborador' }, canActivate: [ReporstGuard] },

			{ path: 'informes', component: InformesComponent, data: { titulo: 'Informes' } },
			{ path: '', component: SalaSituacionalComponent, data: { titulo: 'Sala Situacional' } },
		]		
	},
	{
		path: 'contratacion',
		component: DashboardComponent,
		canActivate: [IdentityGuard, ContratacionGuard],
		children: [
			{ path: 'contratos', redirectTo: 'contratos/listar', pathMatch: 'full' },
			{ path: 'contratos/listar', component: ListarContratoComponent, data: { titulo: 'Listar Contratos' } },
			{ path: 'contratos/registrar', component: RegistrarContratoComponent, data: { titulo: 'Registrar Contratos' } },
			{ path: 'contratos/editar/:id', component: EditarContratoComponent, data: { titulo: 'Editar Contratos' } },
			
			{ path: 'contratistas', redirectTo: 'contratistas/listar', pathMatch: 'full' },
			{ path: 'contratistas/listar', component: ListarContratistasComponent, data: { titulo: 'Listar Contratistas' } },
			{ path: 'contratistas/registrar', component: RegistrarContratistasComponent, data: { titulo: 'Registrar Contratista' } },
			{ path: 'contratistas/editar/:id', component: EditarContratistasComponent, data: { titulo: 'Editar Contratista' } },
			{ path: '', component: ContratacionComponent, data: { titulo: 'Contratación' } },
		]		
	}
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );