import { Routes, RouterModule } from "@angular/router";

// Components
import { GestionRiesgoComponent } from './gestion-riesgo.component';
import { RegistrarCaracterizacionComponent } from './caracterizacion/registrar-caracterizacion/registrar-caracterizacion.component';

import { ListarTomaMuestrasComponent } from './toma-muestras/listar-toma-muestras/listar-toma-muestras.component';
import { RegistrarTomaMuestrasComponent } from './toma-muestras/registrar-toma-muestras/registrar-toma-muestras.component';
import { EditarTomaMuestrasComponent } from './toma-muestras/editar-toma-muestras/editar-toma-muestras.component';

import { SeguimientoComponent } from './seguimiento/seguimiento.component';
import { BuscarUsuarioComponent } from './seguimiento/buscar-usuario/buscar-usuario.component';
import { RegistrarSeguimientoComponent } from './seguimiento/registrar-seguimiento/registrar-seguimiento.component';
import { ListarSeguimientoComponent } from './seguimiento/listar-seguimiento/listar-seguimiento.component';
import { EditarSeguimientoComponent } from './seguimiento/editar-seguimiento/editar-seguimiento.component';

// Guards
import { GestionRiesgoCasoListGuard, GestionRiesgoCasoRegisterGuard, GestionRiesgoCasoEditGuard } from '../../guards/guard.index';

const gestionRiesgoRoutes: Routes = [
	{ path: 'seguimientos', component: SeguimientoComponent, data: { titulo: 'Seguimientos' }},
	{ path: 'caracterizacion-pacientes', component: RegistrarCaracterizacionComponent, data: { titulo: 'Caracterización de pacientes '} },
	{ path: 'seguimientos/buscar-usuario', component: BuscarUsuarioComponent, data: { titulo: 'Buscar Usuario' } },
	{ path: 'seguimientos/registrar', component: RegistrarSeguimientoComponent, data: { titulo: 'Registrar Seguimiento' } },
	{ path: 'seguimientos/registrar/:patientId', component: RegistrarSeguimientoComponent, data: { titulo: 'Registrar Seguimiento' } },
	{ path: 'seguimientos/editar/:id', component: EditarSeguimientoComponent, data: { titulo: 'Editar Seguimiento' } },
	{ path: 'seguimientos/listar', component: ListarSeguimientoComponent, data: { titulo: 'Listar Seguimientos Realizados' } },
	{ path: 'seguimientos/listar/:document', component: ListarSeguimientoComponent, data: { titulo: 'Listar Seguimientos Realizados' } },
	
	{ path: 'toma-muestras', redirectTo: 'toma-muestras/listar', pathMatch: 'full' },
	{ path: 'toma-muestras/listar', component: ListarTomaMuestrasComponent, data: { titulo: 'Listar Muestras' }, canActivate: [] },
	{ path: 'toma-muestras/registrar', component: RegistrarTomaMuestrasComponent, data: { titulo: 'Registrar Muestras' }, canActivate: [] },
	{ path: 'toma-muestras/editar/:id', component: EditarTomaMuestrasComponent, data: { titulo: 'Editar Muestras' }, canActivate: [] },

	{ path: '', component: GestionRiesgoComponent, data: { titulo: 'Gestión del Riesgo' } },
]
export const GESTION_RIESGO_ROUTES = RouterModule.forChild( gestionRiesgoRoutes );