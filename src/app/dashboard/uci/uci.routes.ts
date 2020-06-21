import { Routes, RouterModule } from "@angular/router";

// Components
import { UciComponent } from './uci.component';
import { ListarOcupacionComponent } from './ocupacion/listar-ocupacion/listar-ocupacion.component';
import { RegistrarOcupacionComponent } from './ocupacion/registrar-ocupacion/registrar-ocupacion.component';
import { EditarOcupacionComponent } from './ocupacion/editar-ocupacion/editar-ocupacion.component';
import { InformesUciComponent } from './informes/informes-uci.component';

// Guards
import { UciReportsGuard } from '../../guards/dashboard/uci/reports/uci-reports.guard';
import { UciOcupacionListGuard } from '../../guards/dashboard/uci/ocupacion/uci-ocupacion-list.guard';
import { UciOcupacionRegisterGuard } from '../../guards/dashboard/uci/ocupacion/uci-ocupacion-register.guard';
import { UciOcupacionEditGuard } from '../../guards/dashboard/uci/ocupacion/uci-ocupacion-edit.guard';


const uciRoutes: Routes = [
	{ path: 'ocupacion', redirectTo: 'ocupacion/listar', pathMatch: 'full' },
	{ path: 'ocupacion/listar', component: ListarOcupacionComponent, data: { titulo: 'Listar Ocupación' }, canActivate: [ UciOcupacionListGuard ] },
	{ path: 'ocupacion/registrar', component: RegistrarOcupacionComponent, data: { titulo: 'Registrar Ocupación' }, canActivate: [ UciOcupacionRegisterGuard ] },
	{ path: 'ocupacion/editar/:id', component: EditarOcupacionComponent, data: { titulo: 'Editar Ocupación' }, canActivate: [ UciOcupacionEditGuard ] },
	
	{ path: 'informes', component: InformesUciComponent, data: { titulo: 'Informes' }, canActivate: [ UciReportsGuard ] },
	{ path: '', component: UciComponent, data: { titulo: 'UCI' } },
]
export const UCI_ROUTES = RouterModule.forChild( uciRoutes );