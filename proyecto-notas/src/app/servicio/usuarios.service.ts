import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private isAuthenticated: boolean = false;
  url = 'http://localhost:3978/api/usuarios';
  constructor(private http:HttpClient) { }

  registrarUsuario(usuario:Usuario):Observable<any>{
    var urlAPI = this.url + '/registrar';
    return this.http.post(urlAPI, usuario);
  }

  acceder(usuario:any):Observable<any>{
    var urlAPI = this.url + '/acceder';
    return this.http.post(urlAPI, usuario).pipe(
      tap(() => {
        this.isAuthenticated = true;
        localStorage.setItem('isAuthenticated', 'true');
      })
    );

  }

  validaUsuario(email:any): Observable<any>{
    var urlAPI = this.url + '/existe-usuario';
    return this.http.post(urlAPI, email);
  }

  obtenerUsuarios(): Observable<any>{
    var urlAPI = this.url + '/consultar-todos';
    return this.http.get(urlAPI);
  }

  eliminarUsuario(id:string): Observable<any>{
    var urlAPI = this.url + '/eliminar-usuario/';
    return this.http.delete(urlAPI + id);
  }

  obtenerUsuario(id:string):Observable<any>{
    var urlAPI = this.url + '/consultar-usuario/';
    return this.http.get(urlAPI + id);
  }

  editarUsuario(id:string, usuario:Usuario):Observable<any>{
    var urlAPI = this.url + '/actualizar-usuario/';
    return this.http.put(urlAPI+id, usuario);
  }

  logout() {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

}
