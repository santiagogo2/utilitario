import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChartsModule } from 'ng2-charts';

// Rutas
import { PAGES_ROUTES } from './dashboard.routes';

// Modules
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

// Components
import { DashboardComponent } from './dashboard.component';

import { HomeComponent } from './home/home.component';
import { SalaSituacionalComponent } from './sala-situacional/sala-situacional.component';
import { RegistrarColaboradoresComponent } from './sala-situacional/colaboradores/registrar-colaboradores/registrar-colaboradores.component';
import { ListarColaboradoresComponent } from './sala-situacional/colaboradores/listar-colaboradores/listar-colaboradores.component';
import { EditarColaboradoresComponent } from './sala-situacional/colaboradores/editar-colaboradores/editar-colaboradores.component';
import { RelacionarColaboradoresComponent } from './sala-situacional/colaboradores/relacionar-colaboradores/relacionar-colaboradores.component';
import { InformesComponent } from './sala-situacional/informes/informes.component';


@NgModule({
	declarations: [
		DashboardComponent,
		HomeComponent,
		RegistrarColaboradoresComponent,
		SalaSituacionalComponent,
		ListarColaboradoresComponent,
		EditarColaboradoresComponent,
		RelacionarColaboradoresComponent,
		InformesComponent,
	],
	exports: [
		DashboardComponent,
	],
	imports: [
		BrowserModule,
		ChartsModule,
		CommonModule,
		FormsModule,
		HttpClientModule,
		NgxPaginationModule,
		SharedModule,
		ComponentsModule,
		PAGES_ROUTES,
	]
})
export class PagesModule {}