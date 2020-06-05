import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

// Components
import { InsurerListComponent } from './insurer-list/insurer-list.component';
import { InsurerRegisterComponent } from './insurer-register/insurer-register.component';
import { InsurerEditComponent } from './insurer-edit/insurer-edit.component';

@NgModule({
	declarations:[
		InsurerListComponent,
		InsurerRegisterComponent,
		InsurerEditComponent,
	],
	imports:[
		CommonModule,
		FormsModule,
		HttpClientModule,
		NgxPaginationModule,
	],
	exports:[
		InsurerListComponent,
		InsurerRegisterComponent,
		InsurerEditComponent,
	]
})
export class InsurerModule{}