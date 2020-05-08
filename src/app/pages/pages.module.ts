import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

// Rutas
import { PAGES_ROUTES } from './pages.routes';

// Modules
import { SharedModule } from '../shared/shared.module';

// Components
import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SalaSituacionalComponent } from './sala-situacional/sala-situacional.component';
import { RegistrarColaboradoresComponent } from './sala-situacional/colaboradores/registrar-colaboradores/registrar-colaboradores.component';
import { ListarColaboradoresComponent } from './sala-situacional/colaboradores/listar-colaboradores/listar-colaboradores.component';
import { EditarColaboradoresComponent } from './sala-situacional/colaboradores/editar-colaboradores/editar-colaboradores.component';
import { RelacionarColaboradoresComponent } from './sala-situacional/colaboradores/relacionar-colaboradores/relacionar-colaboradores.component';

@NgModule({
	declarations: [
		DashboardComponent,
		PagesComponent,
		RegistrarColaboradoresComponent,
		SalaSituacionalComponent,
		ListarColaboradoresComponent,
		EditarColaboradoresComponent,
		RelacionarColaboradoresComponent,
	],
	exports: [
		DashboardComponent,
	],
	imports: [
		BrowserModule,
		CommonModule,
		FormsModule,
		HttpClientModule,
		NgxPaginationModule,
		SharedModule,
		PAGES_ROUTES,
	]
})
export class PagesModule {}