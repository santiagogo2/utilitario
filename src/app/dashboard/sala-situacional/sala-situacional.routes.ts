import { Routes, RouterModule } from "@angular/router";

// Components
import { SalaSituacionalComponent } from './sala-situacional.component';
import { ListarColaboradoresComponent } from './colaboradores/listar-colaboradores/listar-colaboradores.component';
import { RegistrarColaboradoresComponent } from './colaboradores/registrar-colaboradores/registrar-colaboradores.component';
import { EditarColaboradoresComponent } from './colaboradores/editar-colaboradores/editar-colaboradores.component';
import { RelacionarColaboradoresComponent } from './colaboradores/relacionar-colaboradores/relacionar-colaboradores.component';
import { InformesComponent } from './informes/informes.component';

// Guards
import { ReporstGuard } from 'src/app/guards/guard.index';

const salaSituacionRoutes: Routes = [
	{ path: 'colaboradores', redirectTo: 'colaboradores/listar', pathMatch: 'full' },
	{ path: 'colaboradores/listar', component: ListarColaboradoresComponent, data: { titulo: 'Listar Colaboradores' }, canActivate: [ReporstGuard] },
	{ path: 'colaboradores/registrar', component: RegistrarColaboradoresComponent, data: { titulo: 'Registrar Colaborador' }, canActivate: [ReporstGuard] },
	{ path: 'colaboradores/editar/:id', component: EditarColaboradoresComponent, data: { titulo: 'Editar Colaborador' }, canActivate: [ReporstGuard] },
	{ path: 'colaboradores/relacionar/:id', component: RelacionarColaboradoresComponent, data: { titulo: 'Relacionar Colaborador' }, canActivate: [ReporstGuard] },

	{ path: 'informes', component: InformesComponent, data: { titulo: 'Informes' } },
	{ path: '', component: SalaSituacionalComponent, data: { titulo: 'Sala Situacional' } },
]
export const SALA_SITUACIONAL_ROUTES = RouterModule.forChild( salaSituacionRoutes );