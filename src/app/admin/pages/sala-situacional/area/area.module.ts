import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

// Components
import { AreaListComponent } from './area-list/area-list.component';
import { AreaRegisterComponent } from './area-register/area-register.component';
import { AreaEditComponent } from './area-edit/area-edit.component';

@NgModule({
	declarations:[
		AreaListComponent,
		AreaRegisterComponent,
		AreaEditComponent,
	],
	imports:[
		CommonModule,
		FormsModule,
		HttpClientModule,
		NgxPaginationModule,
	],
	exports:[
		AreaListComponent,
		AreaRegisterComponent,
		AreaEditComponent,
	],
})
export class AreaModule{}