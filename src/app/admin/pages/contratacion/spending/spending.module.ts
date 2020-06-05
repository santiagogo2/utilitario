import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

// Components
import { SpendingListComponent } from './spending-list/spending-list.component';
import { SpendingRegisterComponent } from './spending-register/spending-register.component';
import { SpendingEditComponent } from './spending-edit/spending-edit.component';

@NgModule({
	declarations:[
		SpendingListComponent,
		SpendingRegisterComponent,
		SpendingEditComponent,
	],
	imports:[
		CommonModule,
		FormsModule,
		HttpClientModule,
		NgxPaginationModule,
	],
	exports:[
		SpendingListComponent,
		SpendingRegisterComponent,
		SpendingEditComponent,
	]
})
export class SpendingModule{}