import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Services
import { global } from '../../shared/global.service';

// Models
import { Location } from 'src/app/models/model.index';

@Injectable()
export class LocationService {
	public url: string;

	constructor(
		private _http: HttpClient,
	){
		this.url = global.url;
	}

	locationsList(token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.get(this.url + 'location', {headers:headers});
	}

	getLocation(id, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.get(this.url + 'location/' + id, {headers:headers});
	}

	newLocation(location: Location, token): Observable<any>{
		let json = JSON.stringify(location);
		let params = "json="+json;
		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.post(this.url + 'location', params, {headers:headers});
	}

	updateLocation(location: Location, token): Observable<any>{
		let id = location.id;
		let json = JSON.stringify(location);
		let params = "json="+json;
		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.put(this.url + 'location/' + id, params, {headers:headers});
	}

	deleteLocation(id, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.delete(this.url + 'location/' + id, {headers:headers});
	}
}