import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

@NgModule({
	imports: [
		RouterModule,
		CommonModule
	],
	declarations: [
		BreadcrumbsComponent,
		FooterComponent,
		HeaderComponent,
		NopagefoundComponent,
	],
	exports: [
		BreadcrumbsComponent,
		FooterComponent,
		HeaderComponent,
		NopagefoundComponent
	]
})

export class SharedModule {}