import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

// Components
import { SupervisorListComponent } from './supervisor-list/supervisor-list.component';
import { SupervisorRegisterComponent } from './supervisor-register/supervisor-register.component';
import { SupervisorEditComponent } from './supervisor-edit/supervisor-edit.component';

@NgModule({
	declarations:[
		SupervisorListComponent,
		SupervisorRegisterComponent,
		SupervisorEditComponent,
	],
	imports:[
		CommonModule,
		FormsModule,
		HttpClientModule,
		NgxPaginationModule,
	],
	exports:[
		SupervisorListComponent,
		SupervisorRegisterComponent,
		SupervisorEditComponent,
	]
})
export class SupervisorModule{}