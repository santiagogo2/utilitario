import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../../shared/global.service';

@Injectable()
export class UnitService {
	public url: string;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
	}

	unitList( token ): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.get( this.url + 'unit', { headers: headers } );
	}

	getUnit( id, token ): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.get( this.url + 'unit/' + id, { headers: headers } );
	}

	newUnit( unit, token ): Observable<any>{
		let json = JSON.stringify(unit);
		let params = "json="+json;
		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.post( this.url + 'unit', params, { headers: headers } );
	}

	updateUnit( unit, token ): Observable<any>{
		let id = unit.id;
		let json = JSON.stringify(unit);
		let params = "json="+json;
		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.put( this.url + 'unit/' + id, params, { headers: headers } );
	}

	deleteUnit( id, token ): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.delete( this.url + 'unit/' + id, { headers: headers } );
	}
}