import { HttpClient } from '@angular/common/http';
import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'focus-team';

  accessToken$: Observable<string>;
  response: any;

  constructor(private readonly changeDetectorRef: ChangeDetectorRef,
              private readonly authenticationService: AuthenticationService,
              private readonly httpClient: HttpClient) {}

  authenticate(provider: string): void {
    // @ts-ignore
    this.accessToken$ = this.authenticationService.authenticate(provider);
    this.changeDetectorRef.markForCheck();
  }

  insecure(): void {
    this.httpClient.get('api/insecure').subscribe(response => console.log('insecure response', response));
  }

  secure(): void {
    this.httpClient.get('api/secure').subscribe(response => console.log('secure response', response));
  }


}
