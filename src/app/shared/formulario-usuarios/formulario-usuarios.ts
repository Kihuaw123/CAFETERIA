import { Component, signal, inject } from '@angular/core';
import { Usuario } from '../../model/usuario';
import { UsuarioServicio } from '../../services/usuario-servicio';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario-usuarios',
  imports: [FormsModule],
  templateUrl: './formulario-usuarios.html',
  styleUrl: './formulario-usuarios.css',
})
export class FormularioUsuarios {

  private usuarioService = inject(UsuarioServicio);

  listaUsuarios = signal<Usuario[]>([]);

  nuevoUsuario: Usuario = {
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
  };

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe(users => {
      this.listaUsuarios.set(users);
    });
  }

  registrarUsuario() {
    console.log('Botón presionado. Intentando registrar:', this.nuevoUsuario);

    this.usuarioService.postUsuario(this.nuevoUsuario).subscribe({
      next: (res) => {
        this.listaUsuarios.set([res, ...this.listaUsuarios()]);
        this.nuevoUsuario = {
          nombre: '',
          email: '',
          telefono: '',
          direccion: ''
        };
        console.log('Usuario registrado', res);
      },
      error: (err) => {
        console.error('Error al guardar en Firebase:', err);
      }
    });
  }

  eliminarUsuario(id: string) {
    if (confirm('¿Desea eliminar el registro?')) {
      this.usuarioService.deleteUsuario(id).subscribe(() => {
        this.listaUsuarios.set(
          this.listaUsuarios().filter(u => u.id !== id)
        );
      });
    }
  }

}