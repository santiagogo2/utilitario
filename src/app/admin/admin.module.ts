import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Routes
import { ADMIN_ROUTES } from './admin.routes';

// Modules
import { SharedModule } from '../shared/shared.module';

// Components
import { AdminComponent } from './admin.component';

import { UserRegisterComponent } from './pages/user/user-register/user-register.component';
import { UserEditComponent } from './pages/user/user-edit/user-edit.component';
import { UserListComponent } from './pages/user/user-list/user-list.component';

import { RoleListComponent } from './pages/role/role-list/role-list.component';
import { RoleEditComponent } from './pages/role/role-edit/role-edit.component';
import { RoleRegisterComponent } from './pages/role/role-register/role-register.component';

@NgModule({
	declarations: [
		AdminComponent,
		UserRegisterComponent,
		UserEditComponent,
		UserListComponent,
		RoleListComponent,
		RoleEditComponent,
		RoleRegisterComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		HttpClientModule,
		NgxPaginationModule,
		SharedModule,
		FontAwesomeModule,

		ADMIN_ROUTES,
	]
})
export class AdminModule { }
