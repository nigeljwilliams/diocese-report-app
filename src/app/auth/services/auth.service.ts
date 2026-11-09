import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResult } from '../models/auth-result.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * The base url path
   */
  private readonly _baseUrl = environment.apiUrl;

  /**
   * The HttpClient used for making http requests
   */
  private readonly _httpClient = inject(HttpClient);


  /**
   * Attempts to authenticate a user using their username and password
   * @param username the username for authentication
   * @param password the password for authentication
   * @returns an observable containing an AuthResult object
   */
  authenticate(username: string, password: string): Observable<AuthResult> {
    const url = `${this._baseUrl}/auth/login`;

    const body = new HttpParams()
      .set('username', username as string)
      .set('password', password as string);

    return this._httpClient.post<AuthResult>(url, body);
  }
}
