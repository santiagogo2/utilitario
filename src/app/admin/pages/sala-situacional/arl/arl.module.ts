import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

// Components
import { ArlListComponent } from './arl-list/arl-list.component';
import { ArlRegisterComponent } from './arl-register/arl-register.component';
import { ArlEditComponent } from './arl-edit/arl-edit.component';

@NgModule({
	declarations:[
		ArlListComponent,
		ArlRegisterComponent,
		ArlEditComponent,
	],
	imports:[
		CommonModule,
		FormsModule,
		HttpClientModule,
		NgxPaginationModule,
	],
	exports:[
		ArlListComponent,
		ArlRegisterComponent,
		ArlEditComponent,
	]	
})
export class ArlModule{}