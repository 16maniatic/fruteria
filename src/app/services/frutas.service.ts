import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Fruta {
  id: number;
  nombre: string;
  precio: number;
  favorita: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FrutasService {
  private frutas: Fruta[] = [
    { id: 1, nombre: 'Manzana', precio: 1.5, favorita: false },
    { id: 2, nombre: 'Plátano', precio: 1.2, favorita: false },
    { id: 3, nombre: 'Naranja', precio: 1.8, favorita: false },
    { id: 4, nombre: 'Melón', precio: 2, favorita: false },
    { id: 5, nombre: 'Maracuyá', precio: 4, favorita: false }
  ];

  private carrito: Fruta[] = [];
  private carritoSubject = new BehaviorSubject<Fruta[]>([]);

  getFrutas() {
    return this.frutas;
  }

  getFrutaById(id: number) {
    return this.frutas.find(fruta => fruta.id === id);
  }

  toggleFavorito(id: number) {
    const fruta = this.frutas.find(f => f.id === id);
    if (fruta) {
      fruta.favorita = !fruta.favorita;
    }
  }

  getFrutasFavoritas() {
    return this.frutas.filter(fruta => fruta.favorita);
  }

  agregarAlCarrito(fruta: Fruta) {
    this.carrito.push(fruta);
    this.carritoSubject.next(this.carrito);
  }

  getCarrito() {
    return this.carritoSubject.asObservable();
  }
}
