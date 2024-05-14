import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignInComponent } from '../sign-in/sign-in.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, SignInComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
