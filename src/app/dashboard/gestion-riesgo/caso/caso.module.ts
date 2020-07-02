import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../../components/components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Components
import { CasoComponent } from './caso.component';

@NgModule({
	declarations:[
		CasoComponent,
	],
	imports:[
		CommonModule,
		ComponentsModule,
		FontAwesomeModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
	],
	exports:[
		CasoComponent,
	]
})
export class CasoModule{}