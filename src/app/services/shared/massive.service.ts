// Imports necesarios para el funcionamiento del servicio
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../shared/global.service';

@Injectable()
export class MassiveService{
	public url: string;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
	}

	massivePatientCaseStore( infoToSave, token ): Observable<any>{
		let json = JSON.stringify(infoToSave);
		let params = "json="+json;
		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');
		
		return this._http.post(this.url + 'massive-store/patient/case', params, {headers:headers});

	}
}