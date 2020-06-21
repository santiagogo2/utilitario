import { Routes, RouterModule } from '@angular/router';

// Components
import { AdminComponent } from './admin.component';
	// User Components
	import { UserListComponent } from './pages/user/user-list/user-list.component';
	import { UserRegisterComponent } from './pages/user/user-register/user-register.component';
	import { UserEditComponent } from './pages/user/user-edit/user-edit.component';
	import { UserPasswordEditComponent } from './pages/user/user-password-edit/user-password-edit.component';

	// Roles Components
	import { RoleListComponent } from './pages/role/role-list/role-list.component';
	import { RoleRegisterComponent } from './pages/role/role-register/role-register.component';
	import { RoleEditComponent } from './pages/role/role-edit/role-edit.component';

	// Sala Situacional
	import { SalaSituacionalComponent } from './pages/sala-situacional/sala-situacional.component';

	// Contración
	import { AdminContratacionComponent } from './pages/contratacion/admin-contratacion.component';
	
	// Gestión del Riesgo
	import { AdminGestionRiesgoComponent } from './pages/gestion-riesgo/admin-gestion-riesgo.component';
// Guards
import { AdminGuard, IdentityGuard, GestionRiesgoAdminGuard } from '../guards/guard.index';

const adminRoutes: Routes = [
	{
		path: 'admin',
		component: AdminComponent,
		children: [
			{ path: 'sala-situacional', component: SalaSituacionalComponent, data: { titulo: 'Administrar Sala Situacional' }, canActivate:[AdminGuard] },
			{ path: 'contratacion', component: AdminContratacionComponent, data: { titulo: 'Administrar Elementos Contratación' }, canActivate:[AdminGuard] },
			{ path: 'gestion-riesgo', component: AdminGestionRiesgoComponent, data: { titulo: 'Administrar Elementos Gestión del Riesgo' }, canActivate:[GestionRiesgoAdminGuard] },
		]
	},

	{
		path: 'admin/usuarios',
		component: AdminComponent,
		canActivate: [ AdminGuard ],
		children: [
			{ path: 'listar', component: UserListComponent, data: { titulo: 'Listar usuarios del sistema' } },
			{ path: 'agregar', component: UserRegisterComponent, data: { titulo: 'Agregar un nuevo usuario' } },
			{ path: 'editar/:id', component: UserEditComponent, data: { titulo: 'Editar usuario' } },
		]
	},

	{
		path: 'admin/roles',
		component: AdminComponent,
		canActivate: [ AdminGuard ],
		children: [
			{ path: 'listar', component: RoleListComponent, data: { titulo: 'Listar los roles del sistema' } },
			{ path: 'agregar', component: RoleRegisterComponent, data: { titulo: 'Agregar un nuevo role' } },
			{ path: 'editar/:id', component: RoleEditComponent, data: { titulo: 'Editar role' } },
			{ path: '', component: RoleListComponent, data: { titulo: 'Listar los roles del sistema' } },
		]
	},

	{
		path: 'perfil',
		component: AdminComponent,
		canActivate: [ IdentityGuard ],
		children: [
			{ path: 'editar-contraseña', component: UserPasswordEditComponent, data: { titulo: 'Editar contraseña' } },
			{ path: '', component: UserPasswordEditComponent, data: { titulo: 'Editar contraseña' } }
		]
	}
];

export const ADMIN_ROUTES = RouterModule.forChild( adminRoutes );