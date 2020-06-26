import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';

// Modules
import { ComponentsModule } from '../../components/components.module';

// Routes
import { EPP_ROUTES } from './epp.routes';

// Components
import { EppComponent } from './epp.component';
import { EditarSeguimientoEppComponent } from './editar-seguimiento-epp/editar-seguimiento-epp.component';
import { ListarSeguimientoEppComponent } from './listar-seguimiento-epp/listar-seguimiento-epp.component';
import { RegistrarSeguimientoEppComponent } from './registrar-seguimiento-epp/registrar-seguimiento-epp.component';

@NgModule({
    declarations:[
        EppComponent,
        EditarSeguimientoEppComponent,
        ListarSeguimientoEppComponent,
        RegistrarSeguimientoEppComponent
    ],
    imports:[
        CommonModule,
        ComponentsModule,
        FormsModule,
        NgxPaginationModule,
		RouterModule,

        EPP_ROUTES,	
    ],
    exports:[],
})
export class EppModule {}