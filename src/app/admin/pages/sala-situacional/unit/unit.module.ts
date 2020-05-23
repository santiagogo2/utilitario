import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

// Components
import { UnitListComponent } from './unit-list/unit-list.component';
import { UnitRegisterComponent } from './unit-register/unit-register.component';
import { UnitEditComponent } from './unit-edit/unit-edit.component';

@NgModule({
	declarations:[
		UnitListComponent,
		UnitRegisterComponent,
		UnitEditComponent,
	],
	imports:[
		CommonModule,
		FormsModule,
		HttpClientModule,
		NgxPaginationModule,
	],
	exports:[
		UnitListComponent,
		UnitRegisterComponent,
		UnitEditComponent,
	],
})
export class UnitModule { }