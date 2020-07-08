import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../../shared/global.service';

@Injectable()
export class CollaboratorsService {
	public url: string;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
	}

	getCollaborators(token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.get(this.url + 'collaborator', {headers:headers});
	}

	getCollaborator(id, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.get(this.url + 'collaborator/' + id, {headers:headers});
	}

	getCollaboratorByDocument(document, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.get(this.url + 'collaborator/document/' + document, {headers:headers});
	}

	getCollaboratorsByChain( chain, token ): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.get(this.url + 'collaborator/search/chain/' + chain, {headers:headers});
	}

	newRegister(collaborator, token): Observable<any>{
		let json = JSON.stringify(collaborator);
		let params = 'json=' + json;
		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.post(this.url + 'collaborator', params, {headers:headers});
	}

	updateRegister(collaborator, token): Observable<any>{
		let id = collaborator.id;
		let json = JSON.stringify(collaborator);
		let params = 'json=' + json;
		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.put(this.url + 'collaborator/' + id, params, {headers:headers});
	}

	updateRelated(affected, origin, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.put(this.url + 'collaborator/related/' + affected + '/' + origin, '', {headers:headers});		
	}

	deleteRegister(id, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		return this._http.delete(this.url + 'collaborator/' + id, {headers:headers});		
	}
}