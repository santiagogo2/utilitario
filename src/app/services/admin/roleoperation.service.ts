import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from '../shared/global.service';
import { Observable } from 'rxjs';

@Injectable()
export class RoleOperationService{
	public url: string;

	constructor(
		private _http: HttpClient,
	){
		this.url = global.url;
	}

	getOperationsByRole( idRole, token ): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.get( this.url + 'roleoperations/show/role/' + idRole, {headers:headers} );
	}
}