import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../../shared/global.service';

@Injectable()
export class AreaService{
	public url: string; 

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
	}

	areaList( token ): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.get( this.url + 'area', { headers: headers } );
	}

	getArea( id, token ): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.get( this.url + 'area/' + id, { headers: headers } );
	}

	newArea( area, token ): Observable<any>{
		let json = JSON.stringify(area);
		let params = "json="+json;
		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.post( this.url + 'area', params, { headers: headers } );
	}

	updateArea( area, token ): Observable<any>{
		let id = area.id;
		let json = JSON.stringify(area);
		let params = "json="+json;
		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.put( this.url + 'area/' + id, params, { headers: headers } );
	}

	deleteArea( id, token ): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.delete( this.url + 'area/' + id, { headers: headers } );
	}
}