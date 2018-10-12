import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  get accessToken(): string {
    return this._accessToken;
  }

  private _accessToken$: ReplaySubject<string> = new ReplaySubject<string>(1);
  accessToken$: Observable<string> = this._accessToken$.asObservable();
  private _accessToken: string;


  authenticate(provider: string): Observable<string> {
    // @ts-ignore
    window.authenticateCallback = token => {
      console.log('got token', token);
      this._accessToken$.next(token);
      this._accessToken = token;
    };

    window.open('/api/authentication/' + provider + '/start');

    return this.accessToken$;
  }
}
