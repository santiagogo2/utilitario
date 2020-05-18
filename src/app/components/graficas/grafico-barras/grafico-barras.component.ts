import { Component, OnInit, Input } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
	selector: 'app-grafico-barras',
	templateUrl: './grafico-barras.component.html',
	styles: []
})
export class GraficoBarrasComponent implements OnInit {	
	@Input() public barChartData: ChartDataSets[];
	@Input() public barChartLabels: string[];
	@Input() public barChartType: string;

	public barChartLegend = true;
	public barChartPlugins = [pluginDataLabels];
	public barChartOptions: ChartOptions = {

		responsive: true,
		maintainAspectRatio: false,
		legend: { position: 'top' },
		scales: {
			yAxes: [{
				stacked: true,
				ticks: { stepSize: 1 }
			}],
			xAxes: [{
				stacked: true,
				ticks: { stepSize: 1 }
			}]
		},
		plugins: {
			datalabels: {
				anchor: 'end',
				font: {
					size: 12,
					weight: 'bold'
				},
				align: function(context) {
					var index = context.dataIndex;
					var value:any = context.dataset.data[index];
					var invert = Math.abs(value) <= 1;
					return value < 1 ? 'end' : 'start'
				},
				color: '#343A40',
				formatter: (value, ctx) => {
					return ctx.dataset.data[ctx.dataIndex]
				},
			},
		}
	};

	public barChartColors: Array<any>;

	constructor() {
		this.barChartColors = [
			{
				backgroundColor: ['rgba(255,99,132,0.2)', 'rgba(54,162,235,0.2)'],
				borderColor: ['rgba(255,99,132,1)', 'rgba(54,162,235,1)']
			},
		]
	}

	ngOnInit(): void {
	}

}
