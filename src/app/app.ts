import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from "./features/home/home";
import { Nav } from "./shared/nav/nav";
import { Nosotros } from "./features/nosotros/nosotros";
// 1. IMPORTA AQUÍ TU COMPONENTE
import { FormularioUsuarios } from './shared/formulario-usuarios/formulario-usuarios'; 

@Component({
  selector: 'app-root',
  standalone: true,
  // 2. AÑÁDELO AQUÍ AL ARREGLO
  imports: [RouterOutlet, Home, Nav, Nosotros, FormularioUsuarios], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('cafeteria_puce');
}