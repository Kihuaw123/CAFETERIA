import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Usuario } from '../model/usuario';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UsuarioServicio {
  private http = inject(HttpClient);

  private API_USUARIOS= 'https://cafeteria-2c449-default-rtdb.firebaseio.com/';

  //METODO POST
  postUsuario(usuario:Usuario):Observable<Usuario>{
    return this.http.post<Usuario>('this.API_USUARIOS/Usuarios.json', usuario);
  }

}
