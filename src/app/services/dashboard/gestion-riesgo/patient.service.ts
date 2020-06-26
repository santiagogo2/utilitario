import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Services
import { global } from '../../shared/global.service';
import { Observable } from 'rxjs';

// Models
import { Patient } from 'src/app/models/model.index';

@Injectable()
export class PatientService {
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = global.url;
    }

    patientsList( token ): Observable<any>{
        let headers = new HttpHeaders().set('Authorization', token);

        return this._http.get( this.url + 'patient', {headers:headers});
    }

    getPatient( id, token ): Observable<any>{
        let headers = new HttpHeaders().set('Authorization', token);

        return this._http.get( this.url + 'patient/' + id, {headers:headers});
	}

    getPatientByDocument( document, token ): Observable<any>{
        let headers = new HttpHeaders().set('Authorization', token);

        return this._http.get( this.url + 'patient/search/document/' + document, {headers:headers});
    }

    newPatient( patient: Patient, token ): Observable<any>{
        let json = JSON.stringify( patient );
        let params = "json="+json;
        let headers = new HttpHeaders().set('Authorization', token)
                                       .set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post( this.url + 'patient', params, {headers:headers});
    }

    updatePatient( patient: Patient, token ): Observable<any>{
        let id = patient.id;
        let json = JSON.stringify( patient );
        let params = "json="+json;
        let headers = new HttpHeaders().set('Authorization', token)
                                       .set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.put( this.url + 'patient/' + id, params, {headers:headers});
    }

    deletePatient( id, token ): Observable<any>{
        let headers = new HttpHeaders().set('Authorization', token);

        return this._http.delete( this.url + 'patient/' + id, {headers:headers});
    }
}