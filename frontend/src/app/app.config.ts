import { ApplicationConfig } from '@angular/core';
import { HTTP_INTERCEPTORS, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';
import { addTokenInterceptor } from './utils/add-token.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    // Interceptor HTTP para agregar token de autorización
    provideHttpClient(
      withInterceptors([addTokenInterceptor])),

    // Proveedor de enrutamiento
    provideRouter(routes),
    
    // Proveedores para animaciones
    provideAnimations(),
    
    // Proveedor para mostrar notificaciones Toastr
    provideToastr({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
    
    // Proveedor para la hidratación del cliente
    provideClientHydration(),
    
    // Proveedor para el cliente HTTP
    provideHttpClient(),
  ],
};
