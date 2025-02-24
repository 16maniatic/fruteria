import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FrutasService, Fruta } from '../services/frutas.service';

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    @if (fruta) {
      <div class="detalle-container">
        <h2>{{ fruta.nombre }}</h2>
        <p>Precio: {{ fruta.precio | currency:'EUR' }}</p>
        <div class="buttons-container">
          <button (click)="agregarAlCarrito()" class="agregar-btn">
            Agregar al carrito
          </button>
          <button (click)="toggleFavorito()" class="favorito-btn">
            {{ fruta.favorita ? '❤️' : '🤍' }}
          </button>
        </div>
        <button routerLink="/producto" class="volver-btn">
          Volver a Productos
        </button>
      </div>
    } @else {
      <p>Producto no encontrado</p>
    }
  `,
  styles: [`
    .detalle-container {
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
      font-family: "Ubuntu", system-ui;
    }
    .buttons-container {
      display: flex;
      gap: 10px;
      align-items: center;
    }
    .agregar-btn {
      padding: 8px 16px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .favorito-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
    }
    .volver-btn {
      padding: 8px 16px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 10px;
    }
  `]
})
export class DetalleProductoComponent implements OnInit {
  fruta?: Fruta;

  constructor(
    private route: ActivatedRoute,
    private frutasService: FrutasService
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.fruta = this.frutasService.getFrutaById(id);
  }

  toggleFavorito() {
    if (this.fruta) {
      this.frutasService.toggleFavorito(this.fruta.id);
    }
  }

  agregarAlCarrito() {
    if (this.fruta) {
      this.frutasService.agregarAlCarrito(this.fruta);
    }
  }
}
