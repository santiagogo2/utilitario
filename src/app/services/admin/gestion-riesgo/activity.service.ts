import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Services
import { global } from '../../shared/global.service';

// Models
import { Activity } from 'src/app/models/model.index';

@Injectable()
export class ActivityService {
	public url: string;

	constructor(
		private _http: HttpClient,
	){
		this.url = global.url;
	}

	activitiesList(token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.get(this.url + 'activity', {headers:headers});
	}

	getActivity(id, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.get(this.url + 'activity/' + id, {headers:headers});
	}
}