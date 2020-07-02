import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../../components/components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ContactoComponent } from './contacto.component';

// Components

@NgModule({
	declarations:[
		ContactoComponent
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
		ContactoComponent,
	]
})
export class ContactoModule{}