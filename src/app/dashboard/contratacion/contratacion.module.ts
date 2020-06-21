import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../components/components.module';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';

// Routes
import { CONTRATACION_ROUTES } from './contratacion.routes';

// Components
import { ContratacionComponent } from './contratacion.component';

import { EditarContratistasComponent } from './contratistas/editar-contratistas/editar-contratistas.component';
import { ListarContratistasComponent } from './contratistas/listar-contratistas/listar-contratistas.component';
import { RegistrarContratistasComponent } from './contratistas/registrar-contratistas/registrar-contratistas.component';

import { EditarContratoComponent } from './contrato/editar-contrato/editar-contrato.component';
import { ListarContratoComponent } from './contrato/listar-contrato/listar-contrato.component';
import { RegistrarContratoComponent } from './contrato/registrar-contrato/registrar-contrato.component';

@NgModule({
    declarations:[
        ContratacionComponent,
        EditarContratistasComponent,
        ListarContratistasComponent,
        RegistrarContratistasComponent,
        EditarContratoComponent,
        ListarContratoComponent,
        RegistrarContratoComponent,
    ],
    imports:[
        CommonModule,
        ComponentsModule,
        FormsModule,
        FontAwesomeModule,
        HttpClientModule,
        NgxPaginationModule,
		RouterModule,
		
		CONTRATACION_ROUTES,
    ],
    exports:[
        ContratacionComponent,
        EditarContratistasComponent,
        ListarContratistasComponent,
        RegistrarContratistasComponent,
        EditarContratoComponent,
        ListarContratoComponent,
        RegistrarContratoComponent,
    ],
})
export class ContratacionModule {}