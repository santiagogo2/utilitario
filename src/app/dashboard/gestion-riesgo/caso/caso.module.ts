import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';

// Components
import { EditarCasoComponent } from './editar-caso/editar-caso.component';
import { ListarCasoComponent } from './listar-caso/listar-caso.component';
import { RegistrarCasoComponent } from './registrar-caso/registrar-caso.component';
import { TomaMuestrasModule } from '../toma-muestras/toma-muestras.module';

@NgModule({
	declarations:[
		EditarCasoComponent,
		ListarCasoComponent,
		RegistrarCasoComponent,
	],
	imports:[
		CommonModule,
		FontAwesomeModule,
		FormsModule,
		NgxPaginationModule,
		RouterModule,
		TomaMuestrasModule,
	],
	exports:[
		EditarCasoComponent,
		ListarCasoComponent,
		RegistrarCasoComponent,
	]
})
export class CasoModule{}