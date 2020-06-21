import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../components/components.module';
import { RouterModule } from '@angular/router';

// Routes
import { HOME_ROUTES } from './home.routes';

// Components
import { HomeComponent } from './home.component';

@NgModule({
	declarations:[
		HomeComponent,
	],
	imports:[
		CommonModule,
		ComponentsModule,
		RouterModule,

		HOME_ROUTES,
	],
	exports:[
		HomeComponent,
	]
})
export class HomeModule {}