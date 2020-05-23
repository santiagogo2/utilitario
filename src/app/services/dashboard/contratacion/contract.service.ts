import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../../shared/global.service';

@Injectable()
export class ContractService {
	public url: string;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
	}

	contractList( token ): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		
		return this._http.get( this.url + 'contract', { headers:headers } );
	}

	getContract( id, token ): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		
		return this._http.get( this.url + 'contract/' + id, { headers:headers } )
	}

	newContract( contract, token ): Observable<any>{
		let json = JSON.stringify( contract );
		let params = "json="+json;
		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.post( this.url + 'contract', params, { headers:headers } );
	}

	updateContract( contract, token ): Observable<any>{
		let id = contract.id;
		let json = JSON.stringify( contract );
		let params = "json="+json;
		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.put( this.url + 'contract/' + id, params, { headers:headers } ); 
	}

	deleteContract( id, token ): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.delete( this.url + 'contract/' + id, { headers:headers } );
	}
}