import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../components/components.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Modules
import { CasoModule } from './caso/caso.module';
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
		CasoModule,
        CommonModule,
		ComponentsModule,
        FormsModule,
		RouterModule,
		TomaMuestrasModule,
		
		GESTION_RIESGO_ROUTES,
    ],
    exports:[
        GestionRiesgoComponent,
    ],
})
export class GestionRiesgoModule {}