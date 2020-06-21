import { NgModule } from '@angular/core';

// Rutas
import { DASHBOARD_ROUTES } from './dashboard.routes';

// Modules
import { SharedModule } from '../shared/shared.module';

// Components
import { DashboardComponent } from './dashboard.component';


@NgModule({
	declarations: [
		DashboardComponent,
	],
	exports: [
		DashboardComponent,
	],
	imports: [
		SharedModule,
		DASHBOARD_ROUTES,
	]
})
export class DashboardModule {}