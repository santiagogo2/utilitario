import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../../components/components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { TomaMuestrasModule } from '../toma-muestras/toma-muestras.module';

// Components
import { BuscarUsuarioComponent } from './buscar-usuario/buscar-usuario.component';
import { RegistrarSeguimientoComponent } from './registrar-seguimiento/registrar-seguimiento.component';
import { SeguimientoComponent } from './seguimiento.component';
import { ListarSeguimientoComponent } from './listar-seguimiento/listar-seguimiento.component';
import { EditarSeguimientoComponent } from './editar-seguimiento/editar-seguimiento.component';

@NgModule({
	declarations:[		
		BuscarUsuarioComponent, RegistrarSeguimientoComponent, SeguimientoComponent, ListarSeguimientoComponent, EditarSeguimientoComponent,
	],
	imports:[
		CommonModule,
		ComponentsModule,
		FontAwesomeModule,
		FormsModule,
		NgxPaginationModule,
		PipesModule,
		RouterModule,
		TomaMuestrasModule
	],
	exports:[
	]
})
export class SeguimientoModule{}