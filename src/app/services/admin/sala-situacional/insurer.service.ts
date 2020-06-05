import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../../shared/global.service';

@Injectable()
export class InsurerService {
	public url: string;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
	}

	insurerList( token ): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.get( this.url + 'insurer', { headers: headers } );
	}

	getInsurer( id, token ): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.get( this.url + 'insurer/' + id, { headers: headers } );
	}

	newInsurer( insurer, token ): Observable<any>{
		let json = JSON.stringify(insurer);
		let params = "json="+json;
		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.post( this.url + 'insurer', params, { headers: headers } );
	}

	updateInsurer( insurer, token ): Observable<any>{
		let id = insurer.id;
		let json = JSON.stringify(insurer);
		let params = "json="+json;
		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.put( this.url + 'insurer/' + id, params, { headers: headers } );
	}

	deleteInsurer( id, token ): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.delete( this.url + 'insurer/' + id, { headers: headers } );
	}
}