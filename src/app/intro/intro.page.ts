import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';


@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton]
})
export class IntroPage implements OnInit {

  constructor(private router: Router,private storageService : StorageService) { }

  ngOnInit() {
  }

  async goBack(){
    await this.storageService.set('validateIntro',true);
    this.router.navigateByUrl("/home");
    
    console.log('Volver');

    // al volver al home, guardar en el storage que vi la pagina de intro

  }

}
