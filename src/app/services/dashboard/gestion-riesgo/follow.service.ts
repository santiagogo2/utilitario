import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from '../../shared/global.service';
import { Follow } from 'src/app/models/model.index';

@Injectable()
export class FollowService{
	public url: string;

	constructor(
		private _http: HttpClient,
	){
		this.url = global.url;
	}

	followList( token ): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.get( this.url + 'follow', {headers:headers} );
	}

    getFollow( id, token ): Observable<any>{
        let headers = new HttpHeaders().set('Authorization', token);

        return this._http.get( this.url + 'follow/' + id, {headers:headers});
	}

    getFollowByChain( chain, token ): Observable<any>{
        let headers = new HttpHeaders().set('Authorization', token);

        return this._http.get( this.url + 'follow/search/chain/' + chain, {headers:headers});
	}

    newFollow( follow: Follow, token ): Observable<any>{
        let json = JSON.stringify( follow );
        let params = "json="+json;
        let headers = new HttpHeaders().set('Authorization', token)
                                       .set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post( this.url + 'follow', params, {headers:headers});
    }

    updateFollow( follow: Follow, token ): Observable<any>{
        let id = follow.id;
        let json = JSON.stringify( follow );
        let params = "json="+json;
        let headers = new HttpHeaders().set('Authorization', token)
                                       .set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.put( this.url + 'follow/' + id, params, {headers:headers});
    }

    deleteFollow( id, token ): Observable<any>{
        let headers = new HttpHeaders().set('Authorization', token);

        return this._http.delete( this.url + 'follow/' + id, {headers:headers});
    }
}