import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

// Components
import { LocationEditComponent } from './location-edit/location-edit.component';
import { LocationListComponent } from './location-list/location-list.component';
import { LocationRegisterComponent } from './location-register/location-register.component';

@NgModule({
	declarations:[
		LocationEditComponent,
		LocationListComponent,
		LocationRegisterComponent,
	],
	imports:[
		CommonModule,
		FormsModule,
		NgxPaginationModule,
	],
	exports:[
		LocationEditComponent,
		LocationListComponent,
		LocationRegisterComponent,
	]
})
export class LocationModule {}