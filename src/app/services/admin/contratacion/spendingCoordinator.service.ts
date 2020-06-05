import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Services 
import { global } from '../../shared/global.service';

@Injectable()
export class SpendingCoordinatorService {
	public url: string;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
	}

	spendingCoordinatorList( token ): Observable<any>{
		let headers = new HttpHeaders().set( 'Authorization', token );

		return this._http.get( this.url + 'spendingCoordinator', {headers:headers} );
	}

	getSpendingCoordinator( id, token ): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.get( this.url + 'spendingCoordinator/' + id, { headers: headers } );
	}

	newSpendingCoordinator( spendingCoordinator, token ): Observable<any>{
		let json = JSON.stringify(spendingCoordinator);
		let params = "json="+json;
		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.post( this.url + 'spendingCoordinator', params, { headers: headers } );
	}

	updateSpendingCoordinator( spendingCoordinator, token ): Observable<any>{
		let id = spendingCoordinator.id;
		let json = JSON.stringify(spendingCoordinator);
		let params = "json="+json;
		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.put( this.url + 'spendingCoordinator/' + id, params, { headers: headers } );
	}

	deleteSpendingCoordinator( id, token ): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.delete( this.url + 'spendingCoordinator/' + id, { headers: headers } );
	}
}