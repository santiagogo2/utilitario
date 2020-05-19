import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

// Modules

// Components
import { GraficoBarrasComponent } from './graficas/grafico-barras/grafico-barras.component';
import { GraficoDonaComponent } from './graficas/grafico-dona/grafico-dona.component';
import { GraficoLineaComponent } from './graficas/grafico-linea/grafico-linea.component';
import { GraficoPieComponent } from './graficas/grafico-pie/grafico-pie.component';

import { CircleImageComponent } from './imagenes/circle-image/circle-image.component';

@NgModule({
	declarations: [
		GraficoBarrasComponent,
		GraficoDonaComponent,
		GraficoLineaComponent,
		GraficoPieComponent,
		CircleImageComponent,
	],
	imports: [
		CommonModule,
		ChartsModule,
	],
	exports: [
		GraficoBarrasComponent,
		GraficoDonaComponent,
		GraficoLineaComponent,
		GraficoPieComponent,
		CircleImageComponent,
	]
})
export class ComponentsModule { }
