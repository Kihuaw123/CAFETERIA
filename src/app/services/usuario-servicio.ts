import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Usuario } from '../model/usuario';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsuarioServicio {

  private http = inject(HttpClient);

  private API_USUARIOS =
    'https://cafeteria-2c449-default-rtdb.firebaseio.com/usuarios.json';

  // METODO POST (Corregido para tipar la respuesta real de Firebase)
  postUsuario(usuario: Usuario): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(this.API_USUARIOS, usuario);
  }

  // METODO GET
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<{ [key: string]: Usuario }>(this.API_USUARIOS).pipe(
      map(datos => {
        if (!datos) {
          return [];
        }

        return Object.keys(datos).map(id => ({
          ...datos[id],
          id: id
        }));
      })
    );
  }

  // METODO BUSCAR POR ID
  getUsuarioById(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(
      `https://cafeteria-2c449-default-rtdb.firebaseio.com/usuarios/${id}.json`
    );
  }

  // METODO PUT
  putUsuario(id: string, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(
      `https://cafeteria-2c449-default-rtdb.firebaseio.com/usuarios/${id}.json`,
      usuario
    );
  }

  // METODO DELETE
  deleteUsuario(id: string): Observable<void> {
    return this.http.delete<void>(
      `https://cafeteria-2c449-default-rtdb.firebaseio.com/usuarios/${id}.json`
    );
  }

}