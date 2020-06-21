import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../components/components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';

// Routes
import { GESTION_RIESGO_ROUTES } from './gestion-riesgo.routes';

// Components
import { GestionRiesgoComponent } from './gestion-riesgo.component';
import { EditarCasoComponent } from './caso/editar-caso/editar-caso.component';
import { ListarCasoComponent } from './caso/listar-caso/listar-caso.component';
import { RegistrarCasoComponent } from './caso/registrar-caso/registrar-caso.component';

@NgModule({
    declarations:[
        GestionRiesgoComponent,
        EditarCasoComponent,
        ListarCasoComponent,
        RegistrarCasoComponent,
    ],
    imports:[
        CommonModule,
		ComponentsModule,
		FontAwesomeModule,
        FormsModule,
        HttpClientModule,
        NgxPaginationModule,
		RouterModule,
		
		GESTION_RIESGO_ROUTES,
    ],
    exports:[
        GestionRiesgoComponent,
        EditarCasoComponent,
        ListarCasoComponent,
        RegistrarCasoComponent,
    ],
})
export class GestionRiesgoModule {}