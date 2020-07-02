import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../components/components.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Modules
import { CaracterizacionModule } from './caracterizacion/caracterizacion.module';
import { SeguimientoModule } from './seguimiento/seguimiento.module';
import { TomaMuestrasModule } from './toma-muestras/toma-muestras.module';

// Routes
import { GESTION_RIESGO_ROUTES } from './gestion-riesgo.routes';

// Components
import { GestionRiesgoComponent } from './gestion-riesgo.component';

@NgModule({
    declarations:[
        GestionRiesgoComponent,
    ],
    imports:[
        CommonModule,
		ComponentsModule,
        FormsModule,
		RouterModule,
		
		CaracterizacionModule,
		SeguimientoModule,
		TomaMuestrasModule,
		
		GESTION_RIESGO_ROUTES,
    ],
    exports:[
        GestionRiesgoComponent,
    ],
})
export class GestionRiesgoModule {}