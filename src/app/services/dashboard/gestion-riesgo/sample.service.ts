import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { global } from '../../shared/global.service';
import { Observable } from 'rxjs';

// Models
import { Sample } from 'src/app/models/model.index';

@Injectable()
export class SampleService {
	public url: string;

	constructor(
		private _http: HttpClient,
	){
		this.url = global.url;
	}

	samplesList(token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.get(this.url + 'sample', {headers:headers});
	}

	getSample(id, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.get(this.url + 'sample/' + id, {headers:headers});
	}

	getSamplesByPatient(patientId, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.get(this.url + 'sample/search/case/' + patientId, {headers:headers});
	}

	getSampleByDocument(document, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.get(this.url + 'sample/search/document/' + document, {headers:headers});
	}

	getSamplesByChain(chain, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.get(this.url + 'sample/search/chain/' + chain, {headers:headers});
	}

	newSample(sample: Sample, token): Observable<any>{
		let json = JSON.stringify(sample);
		let params = "json="+json;
		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.post(this.url + 'sample', params, {headers:headers});
	}

	updateSample(sample: Sample, token): Observable<any>{
		let id = sample.id;
		let json = JSON.stringify(sample);
		let params = "json="+json;
		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.put(this.url + 'sample/' + id, params, {headers:headers});
	}

	deleteSample(id, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.delete(this.url + 'sample/' + id, {headers:headers});
	}

	//==========================================================================
	//============================Samples Documents=============================
	//==========================================================================
	downloadSampleDocument(filename, token):Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.get(this.url+ 'sample/get-file/' + `${filename}`, { responseType: 'blob', headers:headers });
	}

	deleteFile(filename, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);
		
		return this._http.delete(this.url + 'sample/delete-file/' + filename, {headers:headers});
	}
}