import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ProductosComponent } from './productos/productos.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { CarritoComponent } from './carrito/carrito.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'producto', component: ProductosComponent },
  { path: 'producto/:id', component: DetalleProductoComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: '**', component: NotFoundComponent }
];
