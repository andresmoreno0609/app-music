import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  ToastController,
  NavController,
  IonInput,
  IonButton, IonItem, IonLabel } from '@ionic/angular/standalone';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonItem, 
    IonButton,
    IonContent,
    IonInput,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  bgFondo = 'var(--bg-color)';
  errorMessage: string = '';

  validation_messages = {
    name: [
      { type: 'required', message: 'El nombre es obligatorio.' },
      {
        type: 'minlength',
        message: 'El nombre debe tener al menos 3 caracteres.',
      },
    ],
    username: [
      { type: 'required', message: 'Los apellidos sib obligatorios.' },
      {
        type: 'minlength',
        message: 'Los apellidos deben tener al menos 4 caracteres.',
      },
    ],
    email: [
      { type: 'required', message: 'El email es obligatorio.' },
      { type: 'email', message: 'Debes ingresar un email válido.' },
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria.' },
      {
        type: 'minlength',
        message: 'La contraseña debe tener al menos 6 caracteres.',
      },
    ],
  };


  constructor(
    private navController: NavController,
    private fromBuilder: FormBuilder,
    private toastController: ToastController,
    private storageService: StorageService,
    private router : Router,
    private authService: AuthService
  ) {
    this.registerForm = this.fromBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      surname: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

 registerUser(formData: any) {
  console.log('Registrando usuario:', formData);

  const payload = {
    user: {
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.password,
      name: formData.name,
      surname: formData.surname
    }
  };

  this.authService.registerUser(payload)
    .then(async (response) => {
      this.errorMessage = '';
      console.log('Registro exitoso:', response);

      try {
        await this.storageService.set('credenciales', {
          name: payload.user.name,
          surname: payload.user.surname,
          email: payload.user.email,
          password: payload.user.password
        });

        this.navController.navigateForward('/login');
      } catch (storageError) {
        console.error('Error guardando en almacenamiento:', storageError);
      }

    })
    .catch((err) => {
      console.warn('Error durante el registro:', err);
      this.errorMessage = err?.message || 'No se pudo completar el registro.';
    });
}


  async presentErrorToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 4000,
      position: 'bottom',
      cssClass: 'toast-error',
    });
    await toast.present();
  }

  ngOnInit() {}

  goToLogin(){
    this.router.navigateByUrl("/login")
  }
}
