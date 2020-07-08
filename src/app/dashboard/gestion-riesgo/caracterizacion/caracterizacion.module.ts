import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../../components/components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { RouterModule } from '@angular/router';

// Modules
import { CasoModule } from '../caso/caso.module';
import { ContactoModule } from '../contacto/contacto.module';
import { PacienteModule } from '../paciente/paciente.module';

// Components
import { RegistrarCaracterizacionComponent } from './registrar-caracterizacion/registrar-caracterizacion.component';
import { ListarCaracterizacionComponent } from './listar-caracterizacion/listar-caracterizacion.component';

@NgModule({
	declarations:[
		RegistrarCaracterizacionComponent,
		ListarCaracterizacionComponent
	],
	imports:[
		CommonModule,
		ComponentsModule,
		FontAwesomeModule,
		FormsModule,
		NgxPaginationModule,
		PipesModule,
		RouterModule,
		
		CasoModule,
		ContactoModule,
		PacienteModule,
	],
	exports:[
		
	]
})
export class CaracterizacionModule{}