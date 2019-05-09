import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiURL = 'https://mighty-refuge-81707.herokuapp.com/api/';

  constructor(private http: HttpClient) {}

  post(url, data){
    const  endpoint = this.apiURL + url;
    return this.http.post(endpoint, data)
    .toPromise()
    .then( data => {
      return data;
    })
    .catch(err => {
        return Promise.reject(err.error || 'Server error');
    });
  }
  postWH(url, data, token ){
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
                               .set('X-access-token', token);
    const  endpoint = this.apiURL + url;
    return this.http.post(endpoint, data, {observe: 'response', headers: headers})
    .toPromise()
    .then( data => {
      return data['body'];
    })
    .catch(err => {
        return Promise.reject(err.error || 'Server error');
    });
  }

  get(url, token) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
                               .set('X-access-token', token);
    const  endpoint = this.apiURL + url;
    return this.http.get(endpoint, {observe: 'response', headers: headers})
    .toPromise()
    .then( data => {
      return data['body'];
    })
    .catch(err => {
        return Promise.reject(err.error || 'Server error');
    });
  }
}
