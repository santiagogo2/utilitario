import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService, SidebarService, UserService } from './service.index';

@NgModule({
	declarations: [],
	imports: [
		CommonModule
	],
	providers: [
		SharedService,
		SidebarService,
		UserService
	]
})
export class ServiceModule { }