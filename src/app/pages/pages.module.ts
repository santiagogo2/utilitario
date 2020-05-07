import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Rutas
import { PAGES_ROUTES } from './pages.routes';

// Modules
import { SharedModule } from '../shared/shared.module';

// Components
import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SalaSituacionalComponent } from './sala-situacional/sala-situacional.component';

@NgModule({
	declarations: [
		DashboardComponent,
		PagesComponent,
		SalaSituacionalComponent,
	],
	exports: [
		DashboardComponent,
	],
	imports: [
		SharedModule,
		PAGES_ROUTES,
		FormsModule
	]
})
export class PagesModule {}