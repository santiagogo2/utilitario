import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../../components/components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../../../pipes/pipes.module';

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
		PipesModule,
		ReactiveFormsModule,
		RouterModule,
	],
	exports:[
		PacienteComponent,
	]
})
export class PacienteModule{}