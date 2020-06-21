import { Routes, RouterModule } from "@angular/router";

// Components
import { ContratacionComponent } from './contratacion.component';

import { ListarContratoComponent } from './contrato/listar-contrato/listar-contrato.component';
import { RegistrarContratoComponent } from './contrato/registrar-contrato/registrar-contrato.component';
import { EditarContratoComponent } from './contrato/editar-contrato/editar-contrato.component';

import { ListarContratistasComponent } from './contratistas/listar-contratistas/listar-contratistas.component';
import { RegistrarContratistasComponent } from './contratistas/registrar-contratistas/registrar-contratistas.component';
import { EditarContratistasComponent } from './contratistas/editar-contratistas/editar-contratistas.component';

const contratacionRoutes: Routes = [
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
export const CONTRATACION_ROUTES = RouterModule.forChild( contratacionRoutes );