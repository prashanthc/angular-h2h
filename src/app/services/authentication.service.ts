import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class User {
  id: number;
  firstName: string;
  lastName: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>

  public currentUserObject: Observable<User>;

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.currentUserObject = this.currentUserSubject.asObservable();
  }

  login(credentials: any) {
    return this.http.post('/authenticate', credentials).pipe(map(res => {
      let user: any = res;
      if (user && user.token) {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      }
      return user;
    }));
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}