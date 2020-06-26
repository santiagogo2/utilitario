import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Services
import { global } from '../../shared/global.service';
import { Observable } from 'rxjs';

// Models
import { Contact } from 'src/app/models/model.index';

@Injectable()
export class ContactService {
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = global.url;
    }

    contactsList( token ): Observable<any>{
        let headers = new HttpHeaders().set('Authorization', token);

        return this._http.get( this.url + 'contact', {headers:headers});
    }

    getContact( id, token ): Observable<any>{
        let headers = new HttpHeaders().set('Authorization', token);

        return this._http.get( this.url + 'contact/' + id, {headers:headers});
	}

    newContact( contact: Contact, token ): Observable<any>{
        let json = JSON.stringify( contact );
        let params = "json="+json;
        let headers = new HttpHeaders().set('Authorization', token)
                                       .set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post( this.url + 'contact', params, {headers:headers});
    }

    updateContact( contact: Contact, token ): Observable<any>{
        let id = contact.id;
        let json = JSON.stringify( contact );
        let params = "json="+json;
        let headers = new HttpHeaders().set('Authorization', token)
                                       .set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.put( this.url + 'contact/' + id, params, {headers:headers});
    }

    deleteContact( id, token ): Observable<any>{
        let headers = new HttpHeaders().set('Authorization', token);

        return this._http.delete( this.url + 'contact/' + id, {headers:headers});
    }
}