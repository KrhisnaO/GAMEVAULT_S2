import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: any[] = [];
  total = 0;
  cCarrito = '';
  sesion: any = null;

  ngOnInit(): void {
    // Obtener sesión
    const sesionStr = localStorage.getItem('sesion');
    this.sesion = sesionStr ? JSON.parse(sesionStr) : null;

    if (this.sesion?.logueado && this.sesion?.tipo === 'usuario') {
      this.cCarrito = 'carrito_' + this.sesion.email;
      this.cargarCarrito();
    }
  }

  cargarCarrito() {
    this.carrito = JSON.parse(localStorage.getItem(this.cCarrito) || '[]');
    this.total = this.carrito.reduce((suma, juego) => suma + juego.precio * juego.cantidad, 0);
  }

  eliminar(index: number): void {
    this.carrito.splice(index, 1);
    localStorage.setItem(this.cCarrito, JSON.stringify(this.carrito));
    this.cargarCarrito();
  }

  vaciarCarrito(): void {
    localStorage.removeItem(this.cCarrito);
    this.cargarCarrito();
  }

  comprar(): void {
    if (this.carrito.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }

    alert('¡Gracias por tu compra!');
    this.vaciarCarrito();
  }

  actualizarCantidad(index: number, cantidad: number): void {
    if (cantidad < 1) return;

    this.carrito[index].cantidad = cantidad;
    localStorage.setItem(this.cCarrito, JSON.stringify(this.carrito));
    this.cargarCarrito();
  }
}
