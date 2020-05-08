import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
	selector: 'app-breadcrumbs',
	templateUrl: './breadcrumbs.component.html',
	styles: []
})
export class BreadcrumbsComponent implements OnInit {
	public page_title: string;
	public url: any;
	public breadcrumbs: any[];

	constructor(
		private _router: Router,
		private _title: Title,
		private _meta: Meta
	) {
		this.getDataRouter().subscribe(
			response => {
				this.page_title = response.titulo;
				this._title.setTitle( this.page_title ); // Setea el titulo general del buscador
				
				const metaTag: MetaDefinition = {
					name: 'description',
					content: this.page_title
				}

				this._meta.updateTag(metaTag);
			}
		);
	}

	ngOnInit(): void {
		this.setBreadcrumbs();
	}

	getDataRouter(){
		return this._router.events.pipe(
			filter( evento => evento instanceof ActivationEnd ), // Si el evento es una instancia de ActivationEnd
			filter( (evento: ActivationEnd) => evento.snapshot.firstChild == null),
			map( (evento: ActivationEnd) => evento.snapshot.data )
		);
	}

	setBreadcrumbs(){
		let url = document.URL;
		let splitUrl = url.split("#/");
		let pageLocation = splitUrl[splitUrl.length-1];

		let breadcrumbsArray = pageLocation.split('/');
		let breadcrumbs = new Array();
		let actualUrl = '';
		breadcrumbsArray.forEach( element => {
			// Se crean las url dentro de un objeto
			let obj = {}; // Nuevo objeto
			actualUrl = actualUrl + '/' + element;
			obj['url'] = actualUrl;

			// Se crean los textos del breadcrum dentro del objeto
			let segments = element.split('-');
			if(segments.length > 1){
				let text = '';
				for( let i = 0; i < segments.length; i++ ){
					text = text + ' ' + segments[i];
				}
				obj['span'] = text.trim();
			} else {
				obj['span'] = element;
			}
			breadcrumbs.push(obj);
		});

		breadcrumbs.pop();

		this.breadcrumbs = breadcrumbs;
	}
}
