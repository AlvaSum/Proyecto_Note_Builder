import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuariosService } from './servicio/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _usuarioServicio: UsuariosService, private router: Router) {}
  
  canActivate(): boolean {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    if (isAuthenticated) {
      return true;
    } else {
      // Redirigir al usuario a la página de inicio de sesión o mostrar mensaje de error
      this.router.navigate(['']);
      return false;
    }
  }
}
