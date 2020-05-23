import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

// Components
import { ProfileListComponent } from './profile-list/profile-list.component';
import { ProfileRegisterComponent } from './profile-register/profile-register.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

@NgModule({
	declarations:[
		ProfileListComponent,
		ProfileRegisterComponent,
		ProfileEditComponent,
	],
	imports:[
		CommonModule,
		FormsModule,
		HttpClientModule,
		NgxPaginationModule,
	],
	exports:[
		ProfileListComponent,
		ProfileRegisterComponent,
		ProfileEditComponent,
	],
})
export class ProfileModule {}