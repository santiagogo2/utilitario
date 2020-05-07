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

	constructor(
		private _router: Router,
		private _title: Title,
		private _meta: Meta
	) {
		this.getDataRouter().subscribe(
			response => {
				console.log(response);
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
	}

	getDataRouter(){
		return this._router.events.pipe(
			filter( evento => evento instanceof ActivationEnd ), // Si el evento es una instancia de ActivationEnd
			filter( (evento: ActivationEnd) => evento.snapshot.firstChild == null),
			map( (evento: ActivationEnd) => evento.snapshot.data )
		);
	}
}
