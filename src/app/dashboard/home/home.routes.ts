import { Routes, RouterModule } from "@angular/router";

// Components
import { HomeComponent } from './home.component';

// Guards
import { IdentityGuard } from 'src/app/guards/guard.index';

const homeRoutes: Routes = [
	{ path: 'inicio', component: HomeComponent, data: { titulo: 'Inicio' }, canActivate: [ IdentityGuard ] },
	{ path: '', redirectTo: '/inicio', pathMatch: 'full' },
]
export const HOME_ROUTES = RouterModule.forChild( homeRoutes );