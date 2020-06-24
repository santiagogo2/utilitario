import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { AngularFileUploaderModule } from 'angular-file-uploader';

// Modules

// Components
import { GraficoBarrasComponent } from './graficas/grafico-barras/grafico-barras.component';
import { GraficoDonaComponent } from './graficas/grafico-dona/grafico-dona.component';
import { GraficoLineaComponent } from './graficas/grafico-linea/grafico-linea.component';
import { GraficoPieComponent } from './graficas/grafico-pie/grafico-pie.component';

import { CircleImageComponent } from './imagenes/circle-image/circle-image.component';
import { GraficoPuntosComponent } from './graficas/grafico-puntos/grafico-puntos.component';
import { LoadDocumentComponent } from './load-document/load-document.component';

@NgModule({
	declarations: [
		GraficoBarrasComponent,
		GraficoDonaComponent,
		GraficoLineaComponent,
		GraficoPieComponent,
		GraficoPuntosComponent,
		CircleImageComponent,
		LoadDocumentComponent,
	],
	imports: [
		CommonModule,
		ChartsModule,
		AngularFileUploaderModule,
	],
	exports: [
		GraficoBarrasComponent,
		GraficoDonaComponent,
		GraficoLineaComponent,
		GraficoPieComponent,
		GraficoPuntosComponent,
		CircleImageComponent,
		LoadDocumentComponent,
	]
})
export class ComponentsModule { }
