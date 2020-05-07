import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Rutas
import { PAGES_ROUTES } from './pages.routes';

// Modules
import { SharedModule } from '../shared/shared.module';

// Components
import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SalaSituacionalComponent } from './sala-situacional/sala-situacional.component';
import { ColaboradoresComponent } from './sala-situacional/colaboradores/colaboradores.component';

@NgModule({
	declarations: [
		ColaboradoresComponent,
		DashboardComponent,
		PagesComponent,
		SalaSituacionalComponent,
	],
	exports: [
		DashboardComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
		PAGES_ROUTES,
		BrowserModule,
		FormsModule,
	]
})
export class PagesModule {}