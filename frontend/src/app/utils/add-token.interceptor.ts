import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { routes } from '../app.routes';

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {

  constructor(private http: HttpClient){}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      console.log("Entrando.........");
      // Clonar la solicitud y agregar el encabezado de autorización si hay un token
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    
    // Pasar la solicitud al siguiente interceptor o al manejador final en la cadena
    return next.handle(req);
  }
}
