import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages/pages.component';

import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';

// Guards
import { LoginGuard } from './guards/login.guard';

const appRoutes: Routes = [
	{ path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
	{ path: 'logout/:sure', component: LoginComponent },
	{ path: '**', component: NopagefoundComponent}
]

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );