import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../../shared/global.service';

@Injectable()
export class ContractorService {
	public url: string;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
	}

	contractorList( token ): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		
		return this._http.get( this.url + 'contractor', { headers:headers } );
	}

	getContractor( id, token ): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		
		return this._http.get( this.url + 'contractor/' + id, { headers:headers } );
	}

	getContractorByDocument( document, token ): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		
		return this._http.get( this.url + 'contractor/document/' + document, { headers:headers } );
	}

	newContractor( contractor, token ): Observable<any>{
		let json = JSON.stringify( contractor );
		let params = "json="+json;
		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.post( this.url + 'contractor', params, { headers:headers } );
	}

	updateContractor( contractor, token ): Observable<any>{
		let id = contractor.id;
		let json = JSON.stringify( contractor );
		let params = "json="+json;
		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.put( this.url + 'contractor/' + id, params, { headers:headers } ); 
	}

	deleteContractor( id, token ): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.delete( this.url + 'contractor/' + id, { headers:headers } );
	}
}