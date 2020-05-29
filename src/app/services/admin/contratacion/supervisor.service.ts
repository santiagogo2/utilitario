import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../../shared/global.service';

@Injectable()
export class SupervisorService {
	public url: string;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
	}

	supervisorList( token ): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.get( this.url + 'supervisor', { headers: headers } );
	}

	getSupervisor( id, token ): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.get( this.url + 'supervisor/' + id, { headers: headers } );
	}

	newSupervisor( supervisor, token ): Observable<any>{
		let json = JSON.stringify(supervisor);
		let params = "json="+json;
		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.post( this.url + 'supervisor', params, { headers: headers } );
	}

	updateSupervisor( supervisor, token ): Observable<any>{
		let id = supervisor.id;
		let json = JSON.stringify(supervisor);
		let params = "json="+json;
		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.put( this.url + 'supervisor/' + id, params, { headers: headers } );
	}

	deleteSupervisor( id, token ): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.delete( this.url + 'supervisor/' + id, { headers: headers } );
	}
}