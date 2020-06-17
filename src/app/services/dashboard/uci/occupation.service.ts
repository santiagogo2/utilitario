import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../../shared/global.service';

@Injectable()
export class OccupationService{
	public url: string;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
	}

	occupationList( token ): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.get( this.url + 'occupation', {headers:headers} );
	}

	getOccupation( id, token ): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.get( this.url + 'occupation/' + id, {headers:headers} );
	}

	newOccupation( occupation, token ): Observable<any>{
		let json = JSON.stringify( occupation );
		let params = "json=" + json;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);

		return this._http.post( this.url + 'occupation', params, {headers:headers} );
	}

	updateOccupation( occupation, token ): Observable<any>{
		let id = occupation.id;
		let json = JSON.stringify( occupation );
		let params = "json=" + json;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
									   .set('Authorization', token);

		return this._http.put( this.url + 'occupation/' + id, params, {headers:headers} );
	}

	deleteOccupation( id, token ): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.delete( this.url + 'occupation/' + id, {headers:headers} );
	}
}