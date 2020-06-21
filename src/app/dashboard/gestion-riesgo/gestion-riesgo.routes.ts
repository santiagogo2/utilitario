import { Routes, RouterModule } from "@angular/router";

// Components
import { GestionRiesgoComponent } from './gestion-riesgo.component';
import { ListarCasoComponent } from './caso/listar-caso/listar-caso.component';
import { RegistrarCasoComponent } from './caso/registrar-caso/registrar-caso.component';
import { EditarCasoComponent } from './caso/editar-caso/editar-caso.component';

// Guards
import { GestionRiesgoCasoListGuard } from '../../guards/dashboard/gestion-riesgo/caso/gestion-riesgo-caso-list.guard';
import { GestionRiesgoCasoRegisterGuard } from '../../guards/dashboard/gestion-riesgo/caso/gestion-riesgo-caso-register.guard';
import { GestionRiesgoCasoEditGuard } from '../../guards/dashboard/gestion-riesgo/caso/gestion-riesgo-caso-edit.guard';


const gestionRiesgoRoutes: Routes = [
	{ path: 'casos', redirectTo: 'casos/listar', pathMatch: 'full' },
	{ path: 'casos/listar', component: ListarCasoComponent, data: { titulo: 'Listar Casos' }, canActivate: [ GestionRiesgoCasoListGuard ] },
	{ path: 'casos/registrar', component: RegistrarCasoComponent, data: { titulo: 'Registrar Casos' }, canActivate: [ GestionRiesgoCasoRegisterGuard ] },
	{ path: 'casos/editar/:id', component: EditarCasoComponent, data: { titulo: 'Editar Casos' }, canActivate: [ GestionRiesgoCasoEditGuard ] },
	{ path: '', component: GestionRiesgoComponent, data: { titulo: 'Gestión del Riesgo' } },
]
export const GESTION_RIESGO_ROUTES = RouterModule.forChild( gestionRiesgoRoutes );