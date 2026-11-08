import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthResult } from '../models/models/auth-result';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _baseUrl = environment.apiUrl;

  private readonly _httpClient = inject(HttpClient);

  authenticate(username: string, password: string): Observable<AuthResult> {
    const url = `${this._baseUrl}/auth/login`;

    const body = new HttpParams()
      .set('username', username as string)
      .set('password', password as string);

    return this._httpClient.post<boolean>(url, body)
      .pipe(
        map((success: boolean) =>
          ({
            success,
            message: success ? '' : 'Failed to authenticate. Incorrect password.',
          } as AuthResult)
        )
      );
  }
}
