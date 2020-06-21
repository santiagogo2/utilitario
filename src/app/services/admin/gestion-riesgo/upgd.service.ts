import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from '../../shared/global.service';
import { Observable } from 'rxjs';

@Injectable()
export class UpgdService{
	public url: string;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
	}

	upgdList(token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.get(this.url + 'UPGD', {headers:headers});
	}

	getUpgd(id, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.get(this.url + 'UPGD/' + id, {headers:headers});
	}

	newUpgd(updg, token): Observable<any>{
		let json = JSON.stringify(updg);
		let params = "json="+json;
		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.post(this.url + 'UPGD', params, {headers:headers});
	}

	updateUpgd(updg, token): Observable<any>{
		let id = updg.id;
		let json = JSON.stringify(updg);
		let params = "json="+json;
		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.put(this.url + 'UPGD/' + id, params, {headers:headers});
	}

	deleteUpgd(id, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.delete(this.url + 'UPGD/' + id, {headers:headers});
	}
}