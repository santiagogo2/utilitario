import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';

// Modules
import { ComponentsModule } from 'src/app/components/components.module';

// Routes
import { CAPACITACION_ROUTES } from './capacitacion.routes';

// Components
import { CapacitacionComponent } from './capacitacion.component';
import { EditarSeguimientoComponent } from './seguimiento/editar-seguimiento/editar-seguimiento.component';
import { ListarSeguimientoComponent } from './seguimiento/listar-seguimiento/listar-seguimiento.component';
import { RegistrarSeguimientoComponent } from './seguimiento/registrar-seguimiento/registrar-seguimiento.component';

@NgModule({
    declarations:[
        CapacitacionComponent,
        EditarSeguimientoComponent,
        ListarSeguimientoComponent,
        RegistrarSeguimientoComponent,
    ],
    imports:[
        CommonModule,
        ComponentsModule,
        FontAwesomeModule,
        NgxPaginationModule,
        RouterModule,

        CAPACITACION_ROUTES,
    ],
    exports:[]
})
export class CapacitacionModule{}