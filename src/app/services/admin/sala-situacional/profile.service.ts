import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../../shared/global.service';

@Injectable()
export class ProfileService{
	public url: string; 

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
	}

	profileList( token ): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.get( this.url + 'profile', { headers: headers } );
	}

	getProfile( id, token ): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.get( this.url + 'profile/' + id, { headers: headers } );
	}

	newProfile( profile, token ): Observable<any>{
		let json = JSON.stringify(profile);
		let params = "json="+json;
		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.post( this.url + 'profile', params, { headers: headers } );
	}

	updateProfile( profile, token ): Observable<any>{
		let id = profile.id;
		let json = JSON.stringify(profile);
		let params = "json="+json;
		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.put( this.url + 'profile/' + id, params, { headers: headers } );
	}

	deleteProfile( id, token ): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.delete( this.url + 'profile/' + id, { headers: headers } );
	}
}