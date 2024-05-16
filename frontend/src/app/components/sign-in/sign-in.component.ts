import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../services/error.service';


@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterModule, LoginComponent, FormsModule, ToastrModule, SpinnerComponent, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {

  username: string = '';
  password: string = '';
  confirmPassword = '';
  loading: boolean = false

  constructor (
    private toastr: ToastrService,
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService
  ) { }

  async addUser() { // Convertir a async si se utiliza await dentro
    // Validamos que el usuario ingrese valores
    if(this.username == '' || this.password == '' || this.confirmPassword == ''){
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    // Validamos que las contraseñas sean iguales
    if(this.password != this.confirmPassword){
      this.toastr.error('Las contraseñas ingresadas son distintas', 'Error');
      return;
    }

    // Creamos el objeto
    const user: User = {
      username: this.username,
      password: this.password
    };

    this.loading = true;
    this._userService.signIn(user).subscribe({
      next: (v) =>{
        console.log("Usuario fue registrado con éxito");
       this.loading = false;
       this.toastr.success(`Usuario: ${this.username} registrado con éxito`, 'Usuario Registrado');
        this.router.navigate(['/login']);

      },
      error: (e: HttpErrorResponse) => {
        this.loading = false
        this._errorService.msjError(e);
      }
    })
    console.log(user);
  }

}