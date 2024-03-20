import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDetails } from '../interfaces/login-details';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { User } from '../interfaces/user';

interface ResultData {
  token: string
}

interface RegisterDetails {

}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();

  private baseUrl = 'http://127.0.0.1:8000/api/';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http:HttpClient) { 
  }

  getLoginStatus(){
    return this.loggedIn.value;
  }
  private updateLoginState(loginState: boolean) {
    this.loggedIn.next(loginState);
  }

  loginUser(loginDetails: LoginDetails){
    this.http.post<ResultData>(this.baseUrl+'login', loginDetails, this.httpOptions).pipe(
      catchError(this.handleError)).subscribe(result => {
        console.log(result);
        this.updateLoginState(true);
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', "Bearer " + result.token);
      })
  }

  logOut(){
    this.http.post<ResultData>(this.baseUrl+'logout', {}, this.httpOptions).pipe(
      catchError(this.handleError)).subscribe(result => {
        console.log(result);
        this.updateLoginState(false);
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', "Bearer ");
      })
  }

  getUser2(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl+'getuser/2', this.httpOptions);
  }

  private handleError(error: HttpErrorResponse){
    if (error.status === 404) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
