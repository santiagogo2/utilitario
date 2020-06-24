import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Services
import { global } from '../../shared/global.service';
import { Observable } from 'rxjs';

// Models
import { Caso } from 'src/app/models/model.index';

@Injectable()
export class CaseService {
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = global.url;
    }

    casesList( token ): Observable<any>{
        let headers = new HttpHeaders().set('Authorization', token);

        return this._http.get( this.url + 'grcase', {headers:headers});
    }

    getCase( id, token ): Observable<any>{
        let headers = new HttpHeaders().set('Authorization', token);

        return this._http.get( this.url + 'grcase/' + id, {headers:headers});
	}
	
	searchCases( chain, token ): Observable<any>{		
        let headers = new HttpHeaders().set('Authorization', token);

        return this._http.get( this.url + 'grcase/search/cases/' + chain, {headers:headers});
	}

    newCase( caso: Caso, token ): Observable<any>{
        let json = JSON.stringify( caso );
        let params = "json="+json;
        let headers = new HttpHeaders().set('Authorization', token)
                                       .set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post( this.url + 'grcase', params, {headers:headers});
    }

    updateCase( caso: Caso, token ): Observable<any>{
        let id = caso.id;
        let json = JSON.stringify( caso );
        let params = "json="+json;
        let headers = new HttpHeaders().set('Authorization', token)
                                       .set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.put( this.url + 'grcase/' + id, params, {headers:headers});
    }

    deleteCase( id, token ): Observable<any>{
        let headers = new HttpHeaders().set('Authorization', token);

        return this._http.delete( this.url + 'grcase/' + id, {headers:headers});
    }
}