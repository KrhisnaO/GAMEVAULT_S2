import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registroForm!: FormGroup;
  error: string = '';
  exito: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      usuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fechaNacimiento: ['', [Validators.required, this.validarEdadMinima]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
      ]],
      confirmarPassword: ['', Validators.required],
      tipo: ['usuario']
    }, { validators: this.coincidePassword });
  }

  get f() {
    return this.registroForm.controls;
  }

  validarEdadMinima(control: AbstractControl) {
    const fecha = new Date(control.value);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fecha.getFullYear();
    const mes = hoy.getMonth() - fecha.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {
      edad--;
    }

    return edad >= 13 ? null : { edadMinima: true };
  }

  coincidePassword(group: AbstractControl) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmarPassword')?.value;
    return pass === confirm ? null : { noCoinciden: true };
  }

  registrar() {
    this.error = '';
    this.exito = false;

    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }

    const { nombre, usuario, email, password, fechaNacimiento, tipo } = this.registroForm.value;

    const nuevoUsuario = { nombre, usuario, email, password, fechaNacimiento, tipo };

    const registrado = this.auth.registrarUsuario(nuevoUsuario);
    if (!registrado) {
      this.error = 'Ya existe un usuario con ese correo o nombre.';
      return;
    }

    this.exito = true;
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }
}
