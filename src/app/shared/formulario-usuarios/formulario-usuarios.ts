import { Component, inject, signal } from '@angular/core';
import { UsuarioServicio } from '../../services/usuario-servicio';
import { Usuario } from '../../model/usuario';
import { FormsModule } from '@angular/forms'; // <-- 1. AGREGA ESTA IMPORTACIÓN

@Component({
  selector: 'app-formulario-usuarios',
  imports: [FormsModule], // <-- 2. PONLO AQUÍ DENTRO DE LOS CORCHETES
  templateUrl: './formulario-usuarios.html',
  styleUrl: './formulario-usuarios.css',
})
export class FormularioUsuarios {
  private usuarioService = inject(UsuarioServicio);

  listaUsuarios = signal<Usuario[]>([]);
  nuevoUsuario : Usuario = {
    nombre: '',
    email: '',
    telefono: '',
    direccion: ''
  }

  registrarUsuario(){
    this.usuarioService.postUsuario(this.nuevoUsuario).subscribe(res =>{
      this.listaUsuarios.set([])
    })
  }
}