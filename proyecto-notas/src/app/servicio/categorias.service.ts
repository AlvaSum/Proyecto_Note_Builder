import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categorias } from '../models/categoria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  url = 'http://localhost:3978/api/categorias';

  constructor(private http:HttpClient) { }

  registrarCategoria(categoria:Categorias):Observable<any>{
    var urlAPI = this.url + '/registrar';
    return this.http.post(urlAPI, categoria);
  }

  obtenerCategorias(user:any): Observable<any>{
    var urlAPI = this.url + '/obtener-categorias';
    return this.http.post(urlAPI, user);
  }

  actualizarCategoria(id:any, title:any){
    var urlAPI = this.url + '/actualizar-categoria/';
    return this.http.put(urlAPI+id, title);
  }

  eliminarCategoria(id:any) {
    var urlAPI = this.url + '/eliminar-categoria/';
    return this.http.delete(urlAPI + id);
  }
}
