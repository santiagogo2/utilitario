import { Routes, RouterModule } from '@angular/router';

// Components
import { AdminComponent } from './admin.component';

import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserListComponent } from './user/user-list/user-list.component';

// Guards

const adminRoutes: Routes = [
	{
		path: 'admin',
		component: AdminComponent,
		children: [
			{ path: 'agregar', component: UserRegisterComponent, data: { titulo: 'Agregar un nuevo usuario' } },
			{ path: 'editar/:id', component: UserEditComponent, data: { titulo: 'Editar usuario' } },
			{ path: 'listar', component: UserListComponent, data: { titulo: 'Listar usuarios del sistema' } }
		]
	}
];

export const ADMIN_ROUTES = RouterModule.forChild( adminRoutes );