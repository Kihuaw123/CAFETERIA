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

    // Creamos una copia del usuario actual para evitar problemas de referencia
    const usuarioAGuardar = { ...this.nuevoUsuario };

    this.usuarioService.postUsuario(usuarioAGuardar).subscribe({
      next: (res) => {
        // Creamos el objeto final con el ID real devuelto por Firebase (res.name)
        const usuarioCreado: Usuario = {
          ...usuarioAGuardar,
          id: res.name
        };

        // Agregamos el nuevo usuario con su ID al inicio de nuestra lista en pantalla
        this.listaUsuarios.set([usuarioCreado, ...this.listaUsuarios()]);

        // Limpiamos los campos del formulario
        this.nuevoUsuario = {
          nombre: '',
          email: '',
          telefono: '',
          direccion: ''
        };
        console.log('Usuario registrado con éxito en Firebase!', usuarioCreado);
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