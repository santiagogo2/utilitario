import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';

// Modules
import { ComponentsModule } from '../../components/components.module';

// Routes
import { EPP_ROUTES } from './epp.routes';

// Components
import { EppComponent } from './epp.component';
import { EditarSeguimientoEppComponent } from './seguimiento/editar-seguimiento-epp/editar-seguimiento-epp.component';
import { ListarSeguimientoEppComponent } from './seguimiento/listar-seguimiento-epp/listar-seguimiento-epp.component';
import { RegistrarSeguimientoEppComponent } from './seguimiento/registrar-seguimiento-epp/registrar-seguimiento-epp.component';
import { EppInformesComponent } from './epp-informes/epp-informes.component';

@NgModule({
    declarations:[
        EppComponent,
        EditarSeguimientoEppComponent,
        ListarSeguimientoEppComponent,
        RegistrarSeguimientoEppComponent,
        EppInformesComponent
    ],
    imports:[
        CommonModule,
        ComponentsModule,
        FontAwesomeModule,
        FormsModule,
        NgxPaginationModule,
		RouterModule,

        EPP_ROUTES,	
    ],
    exports:[],
})
export class EppModule {}