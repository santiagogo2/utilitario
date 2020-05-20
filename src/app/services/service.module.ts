import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, CollaboratorsService } from './service.index';

@NgModule({
	declarations: [],
	imports: [
		CommonModule
	],
	providers: [
		UserService,
		CollaboratorsService
	]
})
export class ServiceModule { }