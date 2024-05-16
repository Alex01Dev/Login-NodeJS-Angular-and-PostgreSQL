import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private myAppURL: string = 'http://localhost:3001/';
  private myAPI_URL: string = 'products/';
  private http = inject(HttpClient);

  constructor() { }

  // AddTokenInterceptor(): Observable<Product[]>{
  //   return this.http.get<Product[]>(`${this.myAppURL} ${this.myAPI_URL}`, )
  // }

  getProducts(): Observable<Product[]>{

    // const token = localStorage.getItem('token')
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    // return this.http.get<Product[]>(`${this.myAppURL}${this.myAPI_URL}`, {headers: headers})
    return this.http.get<Product[]>(`${this.myAppURL}${this.myAPI_URL}`)
  }
}
