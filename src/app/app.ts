import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Nav } from "./shared/nav/nav";




@Component({
  selector: 'app-root',
  standalone: true,
  // 2. AÑÁDELO AQUÍ AL ARREGLO
  imports: [RouterOutlet,  Nav ], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('cafeteria_puce');
}