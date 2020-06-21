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
	// Sala Situacional
	import { AreaModule } from './pages/sala-situacional/area/area.module';
	import { ArlModule } from './pages/sala-situacional/arl/arl.module';
	import { InsurerModule } from './pages/sala-situacional/insurer/insurer.module';
	import { ProfileModule } from './pages/sala-situacional/profile/profile.module';
	import { UnitModule } from './pages/sala-situacional/unit/unit.module';

	// Contratación
	import { SpendingModule } from './pages/contratacion/spending/spending.module';
	import { SupervisorModule } from './pages/contratacion/supervisor/supervisor.module';
	
	// Gestión del Riesgo
	import { UpgdModule } from './pages/gestion-riesgo/updg/upgd.module';
	import { LocationModule } from './pages/gestion-riesgo/location/location.module';

// Components
import { AdminComponent } from './admin.component';
import { AdminContratacionComponent } from './pages/contratacion/admin-contratacion.component';

import { UserRegisterComponent } from './pages/user/user-register/user-register.component';
import { UserEditComponent } from './pages/user/user-edit/user-edit.component';
import { UserListComponent } from './pages/user/user-list/user-list.component';

import { RoleListComponent } from './pages/role/role-list/role-list.component';
import { RoleEditComponent } from './pages/role/role-edit/role-edit.component';
import { RoleRegisterComponent } from './pages/role/role-register/role-register.component';

import { SalaSituacionalComponent } from './pages/sala-situacional/sala-situacional.component';
import { UserPasswordEditComponent } from './pages/user/user-password-edit/user-password-edit.component';
import { AdminGestionRiesgoComponent } from './pages/gestion-riesgo/admin-gestion-riesgo.component';
import { UpzEditComponent } from './pages/gestion-riesgo/upz/upz-edit/upz-edit.component';
import { UpzListComponent } from './pages/gestion-riesgo/upz/upz-list/upz-list.component';
import { UpzRegisterComponent } from './pages/gestion-riesgo/upz/upz-register/upz-register.component';

@NgModule({
	declarations: [
		AdminComponent,
		AdminContratacionComponent,
		UserRegisterComponent,
		UserEditComponent,
		UserListComponent,
		RoleListComponent,
		RoleEditComponent,
		RoleRegisterComponent,
		SalaSituacionalComponent,
		UserPasswordEditComponent,
		AdminGestionRiesgoComponent,
		UpzEditComponent,
		UpzListComponent,
		UpzRegisterComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		HttpClientModule,
		NgxPaginationModule,
		SharedModule,
		AreaModule,
		ArlModule,
		InsurerModule,
		ProfileModule,
		UnitModule,
		UpgdModule,
		LocationModule,

		SpendingModule,
		SupervisorModule,
		FontAwesomeModule,

		ADMIN_ROUTES,
	]
})
export class AdminModule { }
