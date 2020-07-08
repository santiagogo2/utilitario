import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Services
import { global } from '../../shared/global.service';
import { Observable } from 'rxjs';

// Models
import { EppTracking } from 'src/app/models/model.index';

@Injectable()
export class DinamicaService {
	public urlDinamica: string;

	constructor(
		private _http: HttpClient,
	){
		this.urlDinamica = global.urlDinamica;
	}

	getByTernumdoc( ternumdoc ): Observable<any>{
		return this._http.get( this.urlDinamica+'third/ternumdoc/'+ternumdoc );
	}
}