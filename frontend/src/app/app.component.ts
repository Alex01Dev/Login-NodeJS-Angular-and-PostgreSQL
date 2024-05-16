import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddTokenInterceptor } from './utils/add-token.interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    LoginComponent, 
    RouterOutlet, 
    SignInComponent, 
    FormsModule
  ],
  providers : [
    { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true },
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
}
)
export class AppComponent {
  title = 'frontend';
}

