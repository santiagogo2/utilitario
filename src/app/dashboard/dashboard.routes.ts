import { Routes, RouterModule } from '@angular/router';

// Components
import { DashboardComponent } from './dashboard.component';

// Services

// Guards
import { 
	ContratacionGuard, IdentityGuard, ReporstGuard, SalaSituacionalGuard,
	UciGuard, GestionRiesgoGuard,
} from '../guards/guard.index';

const dashboardRoutes: Routes = [
	{
		path: '',
		component: DashboardComponent,
		loadChildren: () => import('./home/home.module').then(m => m.HomeModule),		
	},
	{
		path: 'sala-situacional',
		component: DashboardComponent,
		canActivate: [IdentityGuard, SalaSituacionalGuard],
		loadChildren: () => import('./sala-situacional/sala-situacional.module').then(m => m.SalaSituacionalModule),	
	},
	{
		path: 'contratacion',
		component: DashboardComponent,
		canActivate: [IdentityGuard, ContratacionGuard],
		loadChildren: () => import('./contratacion/contratacion.module').then(m => m.ContratacionModule),	
	},
	{
		path: 'uci',
		component: DashboardComponent,
		canActivate: [ IdentityGuard, UciGuard ],
		loadChildren: () => import('./uci/uci.module').then(m => m.UciModule),
	},
	{
		path: 'gestion-riesgo',
		component: DashboardComponent,
		canActivate: [IdentityGuard, GestionRiesgoGuard ],
		loadChildren: () => import('./gestion-riesgo/gestion-riesgo.module').then(m => m.GestionRiesgoModule),
	}
];

export const DASHBOARD_ROUTES = RouterModule.forChild( dashboardRoutes );