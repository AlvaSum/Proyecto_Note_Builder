import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notas } from '../models/notas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotasService {
  url = 'http://localhost:3978/api/notas';

  constructor(private http:HttpClient) { }

  registrarNota(nota:Notas):Observable<any>{
    var urlAPI = this.url + '/registrar';
    return this.http.post(urlAPI, nota);
  }

  obtenerNotas(notas:any):Observable<any>{
    var urlAPI = this.url + '/obtener-notas';
    return this.http.post(urlAPI, notas);
  }

  actualizarNota(id:any, note:any){
    var urlAPI = this.url + '/actualizar-nota/';
    return this.http.put(urlAPI+id, note);
  }

  eliminarNota(id:any) {
    var urlAPI = this.url + '/eliminar-nota/';
    return this.http.delete(urlAPI + id);
  }
}
