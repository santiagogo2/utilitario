import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../../components/components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';

// Components
import { PacienteComponent } from './paciente.component';

@NgModule({
	declarations:[
		PacienteComponent,
	],
	imports:[
		CommonModule,
		ComponentsModule,
		FontAwesomeModule,
		FormsModule,
		ReactiveFormsModule,
		NgxPaginationModule,
		RouterModule,
	],
	exports:[
		PacienteComponent,
	]
})
export class PacienteModule{}