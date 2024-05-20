import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private myAppURL: string = 'http://localhost:3001/';
  private myAPI_URL: string = 'boot/';
  private http = inject(HttpClient);

  constructor() { }

  // AddTokenInterceptor(): Observable<Product[]>{
  //   return this.http.get<Product[]>(`${this.myAppURL} ${this.myAPI_URL}`, )
  // }

  getPokemons(): Observable<Pokemon[]>{

    // const token = localStorage.getItem('token')
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    // return this.http.get<Product[]>(`${this.myAppURL}${this.myAPI_URL}`, {headers: headers})
    return this.http.get<Pokemon[]>(`${this.myAppURL}${this.myAPI_URL}`)
  }
}
