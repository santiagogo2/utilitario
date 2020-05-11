import { Component, OnInit } from '@angular/core';
import { CollaboratorsService, global, UserService } from '../../../services/service.index';
import { Collaborators } from '../models/collaborators';

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

	public token: string;
	public collaborators: Collaborators[];

	graficos: any = {
		'grafico1': {
			'labels': ['Con Frijoles', 'Con Natilla', 'Con tocino'],
			'data': [24, 30, 46],
			'type': 'doughnut'
		}
	};

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
		this._collaboratorService.getCollaborators(this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this.collaborators = response.collaborators;
					this.gender = this.setGeneralInformation('sexo', global.sexo, 'Contagiados por género', 'doughnut');
					this.epidemicNexus = this.setGeneralInformation('nexo', global.nexos, 'Contagiados por nexo epidemiológico', 'pie');
					this.profile = this.setGeneralInformation('perfil', global.perfil, 'Distribución de casos según el perfil ocupacional', 'horizontalBar');
					this.profile.data = [ { data: this.profile.data, label: 'Eventos' }	];
					this.area = this.setGeneralInformation('area', global.area, 'Distribución según el área asistencia', 'horizontalBar');
					this.area.data = [ { data: this.area.data, label: 'Eventos' } ];
					this.peopleStatus = this.setGeneralInformation('estado', global.estados, 'Distribución de eventos según el estado actual', 'doughnut');
					this.symptoms = this.setSymptoms('Distribución de eventos por síntomas', 'pie');
				}
			},
			error => {
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
}
