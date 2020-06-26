import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../../components/components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';

// Modules
import { PacienteModule } from '../paciente/paciente.module';

// Components
import { RegistrarCaracterizacionComponent } from './registrar-caracterizacion/registrar-caracterizacion.component';

@NgModule({
	declarations:[
		RegistrarCaracterizacionComponent
	],
	imports:[
		CommonModule,
		ComponentsModule,
		FontAwesomeModule,
		FormsModule,
		NgxPaginationModule,
		RouterModule,

		PacienteModule,
	],
	exports:[
		
	]
})
export class CaracterizacionModule{}