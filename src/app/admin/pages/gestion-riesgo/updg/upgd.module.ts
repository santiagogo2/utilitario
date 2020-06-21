import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

// Components
import { UpgdEditComponent } from './upgd-edit/upgd-edit.component';
import { UpgdListComponent } from './upgd-list/upgd-list.component';
import { UpgdRegisterComponent } from './upgd-register/upgd-register.component';

@NgModule({
	declarations:[
		UpgdEditComponent,
		UpgdListComponent,
		UpgdRegisterComponent,
	],
	imports:[
		CommonModule,
		FormsModule,
		NgxPaginationModule,
	],
	exports:[
		UpgdEditComponent,
		UpgdListComponent,
		UpgdRegisterComponent,
	]
})
export class UpgdModule {}