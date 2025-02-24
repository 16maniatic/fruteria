import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FrutasService, Fruta } from '../services/frutas.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="productos-container">
      <button (click)="toggleFiltroFavoritos()" class="filtro-btn">
        {{ mostrarSoloFavoritos ? 'Mostrar todas' : 'Mostrar favoritas' }}
      </button>
      
      <div class="productos-grid">
        @for (fruta of frutasFiltradas; track fruta.id) {
          <div class="producto-card" (click)="verDetalle(fruta.id)">
            <h3>{{ fruta.nombre }}</h3>
            <p>{{ fruta.precio | currency:'EUR' }}</p>
            <button 
              (click)="toggleFavorito($event, fruta.id)"
              class="favorito-btn"
            >
              {{ fruta.favorita ? '❤️' : '🤍' }}
            </button>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .productos-container {
      padding: 20px;
      font-family: "Ubuntu", system-ui;
    }
    .filtro-btn {
      margin-bottom: 20px;
      padding: 8px 16px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-family: "Ubuntu", system-ui;
    }
    .productos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
    }
    .producto-card {
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 8px;
      cursor: pointer;
      transition: transform 0.2s;
    }
    .producto-card:hover {
      transform: translateY(-5px);
    }
    .favorito-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
    }
  `]
})
export class ProductosComponent {
  frutas: Fruta[] = [];
  mostrarSoloFavoritos = false;

  constructor(
    private frutasService: FrutasService,
    private router: Router
  ) {
    this.frutas = this.frutasService.getFrutas();
  }

  get frutasFiltradas() {
    return this.mostrarSoloFavoritos
      ? this.frutas.filter(f => f.favorita)
      : this.frutas;
  }

  toggleFiltroFavoritos() {
    this.mostrarSoloFavoritos = !this.mostrarSoloFavoritos;
  }

  toggleFavorito(event: Event, id: number) {
    event.stopPropagation();
    this.frutasService.toggleFavorito(id);
  }

  verDetalle(id: number) {
    this.router.navigate(['/producto', id]);
  }
}
