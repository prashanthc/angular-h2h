import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    let token = null;
    if (this.authService.currentUserValue) {
      token = this.authService.currentUserValue.token;
    }
    headers = headers.append('Content-Type', 'application/json');
    if (token !== null) {
      headers = headers.append("Authorization", token);
    }
    return headers;
  }

  constructor(private http: HttpClient,
    private authService: AuthenticationService) { }

  getAvailableReports(id: number) {
    return this.http.get(`availableProperties/${id}`, {headers: this.getHeaders()});
  }
}
