import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},

    {path: 'login',  component: LoginComponent},

    {path: 'signIn', component: SignInComponent},

    {path: 'dashboard', component: DashboardComponent},

    {path: '**', redirectTo: 'login', pathMatch: 'full'}
];
