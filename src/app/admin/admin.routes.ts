import { Routes, RouterModule } from '@angular/router';

// Components
import { AdminComponent } from './admin.component';
	// User Components
	import { UserListComponent } from './pages/user/user-list/user-list.component';
	import { UserRegisterComponent } from './pages/user/user-register/user-register.component';
	import { UserEditComponent } from './pages/user/user-edit/user-edit.component';

	// Roles Components
	import { RoleListComponent } from './pages/role/role-list/role-list.component';
	import { RoleRegisterComponent } from './pages/role/role-register/role-register.component';
	import { RoleEditComponent } from './pages/role/role-edit/role-edit.component';

// Guards
import { AdminGuard } from '../guards/guard.index';

const adminRoutes: Routes = [
	{
		path: 'admin/usuarios',
		component: AdminComponent,
		children: [
			{ path: 'listar', component: UserListComponent, data: { titulo: 'Listar usuarios del sistema' }, canActivate: [AdminGuard] },
			{ path: 'agregar', component: UserRegisterComponent, data: { titulo: 'Agregar un nuevo usuario' }, canActivate: [AdminGuard] },
			{ path: 'editar/:id', component: UserEditComponent, data: { titulo: 'Editar usuario' }, canActivate: [AdminGuard] },
		]
	},

	{
		path: 'admin/roles',
		component: AdminComponent,
		children: [
			{ path: 'listar', component: RoleListComponent, data: { titulo: 'Listar los roles del sistema' }, canActivate: [AdminGuard] },
			{ path: 'agregar', component: RoleRegisterComponent, data: { titulo: 'Agregar un nuevo role' }, canActivate: [AdminGuard] },
			{ path: 'editar/:id', component: RoleEditComponent, data: { titulo: 'Editar role' }, canActivate: [AdminGuard] },
		]
	}
];

export const ADMIN_ROUTES = RouterModule.forChild( adminRoutes );