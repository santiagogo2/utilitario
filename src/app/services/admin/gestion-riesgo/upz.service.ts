import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from '../../shared/global.service';
import { Observable } from 'rxjs';

@Injectable()
export class UpzService{
	public url: string;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
	}

	upzList(token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.get(this.url + 'UPZ', {headers:headers});
	}

	getUpz(id, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.get(this.url + 'UPZ/' + id, {headers:headers});
	}

	getUpzByLocation(location, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.get(this.url + 'UPZ/search/location/' + location, {headers:headers});
	}

	newUpz(upz, token): Observable<any>{
		let json = JSON.stringify(upz);
		let params = "json="+json;
		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.post(this.url + 'UPZ', params, {headers:headers});
	}

	updateUpz(upz, token): Observable<any>{
		let id = upz.id;
		let json = JSON.stringify(upz);
		let params = "json="+json;
		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.put(this.url + 'UPZ/' + id, params, {headers:headers});
	}

	deleteUpz(id, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.delete(this.url + 'UPZ/' + id, {headers:headers});
	}
}