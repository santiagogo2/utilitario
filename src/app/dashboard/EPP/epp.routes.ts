import { Routes, RouterModule } from '@angular/router';

// Components
import { EppComponent } from './epp.component';
import { EditarSeguimientoEppComponent } from './editar-seguimiento-epp/editar-seguimiento-epp.component';
import { ListarSeguimientoEppComponent } from './listar-seguimiento-epp/listar-seguimiento-epp.component';
import { RegistrarSeguimientoEppComponent } from './registrar-seguimiento-epp/registrar-seguimiento-epp.component';

// Guards
import { EppSeguimientoEditGuard, EppSeguimientoListGuard, EppSeguimientoRegisterGuard } from '../../guards/guard.index';

const eppRoutes: Routes = [
	{ path: 'seguimiento', redirectTo: 'seguimiento/listar', pathMatch: 'full' },
	{ path: 'seguimiento/listar', component: ListarSeguimientoEppComponent, data: { titulo: 'Listar seguimiento EPP' }, canActivate: [ EppSeguimientoListGuard ] },
	{ path: 'seguimiento/registrar', component: RegistrarSeguimientoEppComponent, data: { titulo: 'Registrar seguimiento EPP' }, canActivate: [ EppSeguimientoRegisterGuard ] },
	{ path: 'seguimiento/editar/:id', component: EditarSeguimientoEppComponent, data: { titulo: 'Editar seguimiento EPP' }, canActivate: [ EppSeguimientoEditGuard ] },
	
	{ path: '', component: ListarSeguimientoEppComponent, data: { titulo: 'Listar seguimiento EPP' } },
]
export const EPP_ROUTES = RouterModule.forChild( eppRoutes );