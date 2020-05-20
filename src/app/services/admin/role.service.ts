import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../shared/global.service';

@Injectable()
export class RoleService{
	public url: string;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
	}

	roleList(token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.get( this.url + 'role', { headers:headers } );
	}

	getRole(id, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.get( this.url + 'role/' + id, { headers:headers } );
	}

	newRole(role, token): Observable<any>{
		let json = JSON.stringify(role);
		let params = "json="+json;
		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.post( this.url + 'role', params, { headers:headers } );
	}

	updateRole(role, token): Observable<any>{
		let id = role.id;
		let json = JSON.stringify(role);
		let params = "json="+json;
		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.put( this.url + 'role/' + id, params, { headers:headers } );
	}

	deleteRole(id, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.delete( this.url + 'role/' + id, { headers:headers } );
	}
}