import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../../shared/global.service';

@Injectable()
export class ArlService {
	public url: string;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
	}

	arlList( token ): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.get( this.url + 'arl', { headers: headers } );
	}

	getArl( id, token ): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.get( this.url + 'arl/' + id, { headers: headers } );
	}

	newArl( arl, token ): Observable<any>{
		let json = JSON.stringify(arl);
		let params = "json="+json;
		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.post( this.url + 'arl', params, { headers: headers } );
	}

	updateArl( arl, token ): Observable<any>{
		let id = arl.id;
		let json = JSON.stringify(arl);
		let params = "json="+json;
		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.put( this.url + 'arl/' + id, params, { headers: headers } );
	}

	deleteArl( id, token ): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.delete( this.url + 'arl/' + id, { headers: headers } );
	}
}