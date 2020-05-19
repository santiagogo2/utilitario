import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';

// Guards
import { LoginGuard } from './guards/guard.index';

const appRoutes: Routes = [
	{ path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
	{ path: 'logout/:sure', component: LoginComponent },
	{ path: '**', component: NopagefoundComponent}
]

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );