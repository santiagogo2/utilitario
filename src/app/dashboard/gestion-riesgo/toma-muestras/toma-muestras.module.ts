import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../../components/components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';

// Components
import { EditarTomaMuestrasComponent } from './editar-toma-muestras/editar-toma-muestras.component';
import { ListarTomaMuestrasComponent } from './listar-toma-muestras/listar-toma-muestras.component';
import { RegistrarTomaMuestrasComponent } from './registrar-toma-muestras/registrar-toma-muestras.component';

@NgModule({
	declarations:[
		EditarTomaMuestrasComponent,
		ListarTomaMuestrasComponent,
		RegistrarTomaMuestrasComponent,
	],
	imports:[
		CommonModule,
		ComponentsModule,
		FontAwesomeModule,
		FormsModule,
		NgxPaginationModule,
		RouterModule,
	],
	exports:[
		EditarTomaMuestrasComponent,
		ListarTomaMuestrasComponent,
		RegistrarTomaMuestrasComponent,
	]
})
export class TomaMuestrasModule{}