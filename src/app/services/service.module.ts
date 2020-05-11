import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService, SidebarService, UserService, CollaboratorsService } from './service.index';

@NgModule({
	declarations: [],
	imports: [
		CommonModule
	],
	providers: [
		SharedService,
		SidebarService,
		UserService,
		CollaboratorsService
	]
})
export class ServiceModule { }