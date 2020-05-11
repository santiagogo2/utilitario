import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChartsModule } from 'ng2-charts';

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
import { InformesComponent } from './sala-situacional/informes/informes.component';

// Temporal
import { GraficoDonaComponent } from '../components/graficas/grafico-dona/grafico-dona.component';
import { GraficoPieComponent } from '../components/graficas/grafico-pie/grafico-pie.component';
import { GraficoBarrasComponent } from '../components/graficas/grafico-barras/grafico-barras.component';

@NgModule({
	declarations: [
		DashboardComponent,
		PagesComponent,
		RegistrarColaboradoresComponent,
		SalaSituacionalComponent,
		ListarColaboradoresComponent,
		EditarColaboradoresComponent,
		RelacionarColaboradoresComponent,
		GraficoDonaComponent,
    	GraficoPieComponent,
    	GraficoBarrasComponent,
		InformesComponent
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
		PAGES_ROUTES,
	]
})
export class PagesModule {}