import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Services
import { global } from '../../shared/global.service';
import { Observable } from 'rxjs';

// Models
import { EppTracking } from 'src/app/models/model.index';

@Injectable()
export class EppTrackingService {
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = global.url;
    }

    eppTrackingList( token ): Observable<any>{
        let headers = new HttpHeaders().set('Authorization', token);

        return this._http.get( this.url + 'epptracking', {headers:headers});
    }

    getEppTracking( id, token ): Observable<any>{
        let headers = new HttpHeaders().set('Authorization', token);

        return this._http.get( this.url + 'epptracking/' + id, {headers:headers});
	}

    newEppTracking( epptracking: EppTracking, token ): Observable<any>{
        let json = JSON.stringify( epptracking );
        let params = "json="+json;
        let headers = new HttpHeaders().set('Authorization', token)
                                       .set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post( this.url + 'epptracking', params, {headers:headers});
    }

    updateEppTracking( epptracking: EppTracking, token ): Observable<any>{
        let id = epptracking.id;
        let json = JSON.stringify( epptracking );
        let params = "json="+json;
        let headers = new HttpHeaders().set('Authorization', token)
                                       .set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.put( this.url + 'epptracking/' + id, params, {headers:headers});
    }

    deleteEppTracking( id, token ): Observable<any>{
        let headers = new HttpHeaders().set('Authorization', token);

        return this._http.delete( this.url + 'epptracking/' + id, {headers:headers});
    }
}