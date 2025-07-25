import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth/auth.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  bgFondo = 'var(--bg-color)';
  errorMessage: string = '';

  validation_messages = {
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
    private fromBuilder: FormBuilder,
    private authService: AuthService,
    private navController: NavController,
    private toastController: ToastController,
    private storageService: StorageService
  ) {
    this.loginForm = this.fromBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}

  

  async loginUser(credentials: any) {
    this.authService.loginUser(credentials).then(res => {
      this.errorMessage = "";
      this.storageService.set('validateLogin',true);
      this.storageService.set('userData', res.user);

      this.navController.navigateForward('intro');

    }).catch(error => {
      this.errorMessage = error.msg || 'Error al iniciar sesión.';
      console.warn('Error de login:', error);
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

  goToRegister() {
  this.navController.navigateForward('/register');
}
}
