import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChartsModule } from 'ng2-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Rutas
import { DASHBOARD_ROUTES } from './dashboard.routes';

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

import { ContratacionComponent } from './contratacion/contratacion.component';
import { ListarContratoComponent } from './contratacion/contrato/listar-contrato/listar-contrato.component';
import { RegistrarContratoComponent } from './contratacion/contrato/registrar-contrato/registrar-contrato.component';
import { EditarContratoComponent } from './contratacion/contrato/editar-contrato/editar-contrato.component';
import { ListarContratistasComponent } from './contratacion/contratistas/listar-contratistas/listar-contratistas.component';
import { EditarContratistasComponent } from './contratacion/contratistas/editar-contratistas/editar-contratistas.component';
import { RegistrarContratistasComponent } from './contratacion/contratistas/registrar-contratistas/registrar-contratistas.component';

import { UciComponent } from './uci/uci.component';
import { EditarOcupacionComponent } from './uci/ocupacion/editar-ocupacion/editar-ocupacion.component';
import { ListarOcupacionComponent } from './uci/ocupacion/listar-ocupacion/listar-ocupacion.component';
import { RegistrarOcupacionComponent } from './uci/ocupacion/registrar-ocupacion/registrar-ocupacion.component';
import { InformesUciComponent } from './uci/informes/informes-uci.component';


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
		ContratacionComponent,
		ListarContratoComponent,
		RegistrarContratoComponent,
		EditarContratoComponent,
		ListarContratistasComponent,
		EditarContratistasComponent,
		RegistrarContratistasComponent,
		UciComponent,
		EditarOcupacionComponent,
		ListarOcupacionComponent,
		RegistrarOcupacionComponent,
		InformesUciComponent,
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
		FontAwesomeModule,
		DASHBOARD_ROUTES,
	]
})
export class DashboardModule {}