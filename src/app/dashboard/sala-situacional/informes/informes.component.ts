import { Component, OnInit } from '@angular/core';
import { CollaboratorsService, global, UserService } from '../../../services/service.index';
import { Collaborators } from '../../../models/model.index';

@Component({
	selector: 'app-informes',
	templateUrl: './informes.component.html',
	styles: [],
	providers: [
		CollaboratorsService,
		UserService
	]
})
export class InformesComponent implements OnInit {
	public status: string;
	public responseMessage: string;
	public preloaderStatus: boolean;

	public area: any;
	public gender: any;
	public epidemicNexus: any;
	public peopleStatus: any;
	public profile: any;
	public symptoms: any;
	public resultingDelay: any;
	public ageGroup: any;
	public weeksReport: any;

	public token: string;
	public collaborators: Collaborators[];

	constructor(
		private _collaboratorService: CollaboratorsService,
		private _userService: UserService
	) {
		this.token = this._userService.getToken();
	}

	ngOnInit(): void {
		this.getCollaborators();
	}

	getCollaborators(){
		this.preloaderStatus = true;

		this._collaboratorService.getCollaborators(this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this.collaborators = response.collaborators;
					this.gender = this.setGeneralInformation('sexo', global.sexo, 'Contagiados por género', 'doughnut');
					this.epidemicNexus = this.setGeneralInformation('nexo', global.nexos, 'Contagiados por nexo epidemiológico', 'pie');
					this.profile = this.setGeneralInformation('perfil', global.perfil, 'Distribución de casos según el perfil ocupacional', 'horizontalBar');
					this.profile.data = [ { data: this.profile.data, label: 'Eventos por perfil' }	];
					this.area = this.setGeneralInformation('area', global.area, 'Distribución según el área asistencial', 'horizontalBar');
					this.area.data = [ { data: this.area.data, label: 'Eventos área asistencial' } ];
					this.peopleStatus = this.setGeneralInformation('estado', global.estados, 'Distribución de eventos según el estado actual', 'doughnut');
					this.symptoms = this.setSymptoms('Distribución de eventos por síntomas', 'pie');
					this.resultingDelay = this.setResultingDelay('Distribución de eventos por demora en los resultados', 'bar');
					this.ageGroup = this.setAgeGroup('Distribución de enventos por grupo etario', 'bar');
					this.ageGroup.data = [ { data: this.ageGroup.data, label: 'Eventos grupo etario' } ];
					this.weeksReport = this.setWeekReport('Distribución de eventos por semanas', 'line');
					this.weeksReport.data = [ { data: this.weeksReport.data } ];
					this.preloaderStatus = false;
				}
			},
			error => {
				this.preloaderStatus = false;
				this.status = error.error.status;
				this.responseMessage = error.error.message;
				console.log(<any>error);
			}
		);
	}

	setGeneralInformation(key:string, vector, title:string, type:string){
		let labels = new Array();
		let data = new Array();
		let variable = {};

		vector.forEach(element => {
			labels.push(element.value);

			let count:number = 0;
			for(let i=0; i<this.collaborators.length; i++){
				if(this.collaborators[i][key] == element.id && this.collaborators[i].contagiado == 0){
					count++;
				}
			}
			data.push(count);
		});
		variable['title'] = title;
		variable['labels'] = labels;
		variable['data'] = data;
		variable['type'] = type;

		return variable;
	}

	setSymptoms(title:string, type:string){
		let labels = new Array();
		let data = new Array();
		let variable = {};

		labels = [
			'FIEBRE','MALESTAR GENERAL','DISNEA','ODINIA',
			'GATROINTESTINALES','ESTORNUDOS','MIALGIAS'
		];

		data = this.dataSymptomsArray(data, 'fiebre');
		data = this.dataSymptomsArray(data, 'malestarGeneral');
		data = this.dataSymptomsArray(data, 'disnea');
		data = this.dataSymptomsArray(data, 'odinia');
		data = this.dataSymptomsArray(data, 'gastrointestinales');
		data = this.dataSymptomsArray(data, 'estornudo');
		data = this.dataSymptomsArray(data, 'mialgias');

		variable['title'] = title;
		variable['labels'] = labels;
		variable['data'] = data;
		variable['type'] = type;

		return variable;
	}

	dataSymptomsArray(data, key){
		let count:number = 0;
		for(let i=0; i<this.collaborators.length; i++){
			if(this.collaborators[i][key] == 0 && this.collaborators[i].contagiado == 0){
				count++;
			}
		}
		data.push(count);
		return data;
	}

	setResultingDelay(title:string, type: string){
		let labels = new Array();
		let data = new Array();
		let variable = {};

		labels = ['1', '2', '3', '4', '5', '6', '7', '8 o más días']
		
		for( let i=0; i<labels.length; i++ ){
			let cont: number = 0;
			this.collaborators.forEach( element => {
				if(element.diasTranscurridos){
					if(labels[i] == element.diasTranscurridos){
						cont++;
					}
				}
			});
			data.push(cont);
		}

		variable['title'] = title;
		variable['labels'] = labels;
		variable['data'] = [ { data: data } ];
		variable['type'] = type;

		return variable;
	}
	setAgeGroup(title: string, type: string){
		let labels = new Array();
		let data = new Array();
		let variable = {};

		labels = [
			'0-9', '10-15', '16-29',
			'30-45', '45-59', 'Mayores de 60'
		];

		data = this.pushAge(data, 0, 9);
		data = this.pushAge(data, 10, 15);
		data = this.pushAge(data, 16, 29);
		data = this.pushAge(data, 30, 45);
		data = this.pushAge(data, 45, 59);
		data = this.pushAge(data, 60, 200);
		
		variable['title'] = title;
		variable['labels'] = labels;
		variable['data'] = data;
		variable['type'] = type;

		return variable;
	}

	pushAge(data, a, b){
		let cont: number = 0;

		this.collaborators.forEach( element => {
			if(element.edad >= a && element.edad <= b && element.contagiado == 0){
				cont++;
			}
		});
		data.push(cont);
		return data;
	}

	setWeekReport(title, type){
		let labels = new Array();
		let data = new Array();
		let variable = {};

		let inicial = true;

		this.collaborators.forEach( element => {
			if(element.fechaResultado && element.contagiado == 0) {
				let week = this.getWeekNumber(element.fechaResultado);

				if(inicial){
					labels.push(week);
					inicial = false;
				}

				let flag = true;
				for(let i=0; i<labels.length; i++){
					if(labels[i] == week){
						flag = false;
						break;
					}
				}
				if(flag) labels.push(week);
			}
		});
		function comparar (a, b){ return a - b; }
		labels.sort( comparar );

		for(let i=0; i<labels.length; i++){
			let cont:number = 0;
			this.collaborators.forEach( element => {
				if(element.fechaResultado && element.contagiado == 0){
					let week = this.getWeekNumber(element.fechaResultado);
					if( labels[i] == week ){
						cont++;
					}
				}
			});
			data.push(cont);
		}

		variable['title'] = title;
		variable['labels'] = labels;
		variable['data'] = data;
		variable['type'] = type;

		return variable;
	}

	getWeekNumber(date) {
		date = date.split('-');
		var d:any = new Date(date[0], +date[1]-1, date[2]);  //Creamos un nuevo Date con la fecha de "this".
		d.setHours(0, 0, 0, 0);   //Nos aseguramos de limpiar la hora.
		d.setDate(d.getDate() + 4 - (d.getDay() || 7)); // Recorremos los días para asegurarnos de estar "dentro de la semana"
		//Finalmente, calculamos redondeando y ajustando por la naturaleza de los números en JS:
		return Math.ceil((((d - +new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
	};
}
