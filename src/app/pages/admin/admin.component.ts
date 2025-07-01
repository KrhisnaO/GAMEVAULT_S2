import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  tipo: string = '';
  juegos: any[] = [];
  usuarios: any[] = [];
  sesion: any = null;

  // Formulario nuevo juego
  nuevoJuego = {
    nombre: '',
    categoria: '',
    precio: 0,
    descripcion: '',
    edad: '',
    jugadores: '',
    duracion: '',
    mecanicas: '',
  };


  // Formulario nuevo usuario
  nuevoUsuario = {
    nombre: '',
    usuario: '',
    email: '',
    password: '',
    tipo: 'usuario'
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const sesionStr = localStorage.getItem('sesion');
    this.sesion = sesionStr ? JSON.parse(sesionStr) : null;

    const juegosGuardados = JSON.parse(localStorage.getItem('juegos') || '[]');
    this.juegos = juegosGuardados;

    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios') || '[]');
    this.usuarios = usuariosGuardados;
  }

  // Juegos
  agregarJuego(): void {
    if (!this.nuevoJuego.nombre || !this.nuevoJuego.categoria || this.nuevoJuego.precio <= 0) return;

    this.juegos.push({ ...this.nuevoJuego });
    localStorage.setItem('juegos', JSON.stringify(this.juegos));
    this.nuevoJuego = { nombre: '', categoria: '', precio: 0, descripcion: '', edad: '', jugadores: '', duracion: '', mecanicas: ''  };
  }

  eliminarJuego(index: number): void {
    this.juegos.splice(index, 1);
    localStorage.setItem('juegos', JSON.stringify(this.juegos));
  }

  // Usuarios
  agregarUsuario(): void {
    if (!this.nuevoUsuario.nombre || !this.nuevoUsuario.usuario || !this.nuevoUsuario.email || !this.nuevoUsuario.password) return;

    this.usuarios.push({ ...this.nuevoUsuario });
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    this.nuevoUsuario = { nombre: '', usuario: '', email: '', password: '', tipo: 'usuario' };
  }

  eliminarUsuario(index: number): void {
    this.usuarios.splice(index, 1);
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
  }

}
