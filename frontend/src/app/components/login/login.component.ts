import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SignInComponent } from '../sign-in/sign-in.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, SignInComponent, CommonModule, FormsModule, ToastrModule, SpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService
  ){}

  ngOnInit(): void{

  }

  login(){

    //Validamos que el usuario ingrese datos
    if(this.username == '' || this.password == ''){
      this.toastr.error('Todos los campos son obligatorios', 'Error')
      return;
    }

    //Creamos el body
    const user: User = {
      username: this.username,
      password: this.password
    }

    this.loading = true;
    this._userService.login(user).subscribe({
      next: (token) => {
        localStorage.setItem('token', token)
        this.router.navigate(['/dashboard'])
        
        
      },
      error: (e:HttpErrorResponse) => {
        this._errorService.msjError(e);
        this.loading = false;
      }
    })

  }

}
