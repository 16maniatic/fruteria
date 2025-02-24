import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrutasService, Fruta } from '../services/frutas.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="carrito-container">
      <h2>Tu Carrito</h2>
      @if (carrito.length === 0) {
        <p>No hay productos en el carrito</p>
      } @else {
        <div class="carrito-items">
          @for (fruta of carrito; track fruta.id) {
            <div class="carrito-item">
              <span>{{ fruta.nombre }}</span>
              <span>{{ fruta.precio | currency:'EUR' }}</span>
            </div>
          }
        </div>
        <div class="total">
          <h3>Total: {{ total | currency:'EUR' }}</h3>
        </div>
      }
    </div>
  `,
  styles: [`
    .carrito-container {
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
      font-family: "Ubuntu", system-ui;
    }
    .carrito-items {
      margin-top: 20px;
    }
    .carrito-item {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      border-bottom: 1px solid #ddd;
    }
    .total {
      margin-top: 20px;
      text-align: right;
    }
  `]
})
export class CarritoComponent implements OnInit {
  carrito: Fruta[] = [];

  constructor(private frutasService: FrutasService) { }

  ngOnInit() {
    this.frutasService.getCarrito().subscribe(
      carrito => this.carrito = carrito
    );
  }

  get total() {
    return this.carrito.reduce((sum, item) => sum + item.precio, 0);
  }
}
