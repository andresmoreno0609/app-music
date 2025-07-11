import { Component,OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, CommonModule, IonButton],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit{
  colorClaro = 'var(--color-claro)';
  colorOscuro = 'var(--color-oscuro)';
  colorActual = this.colorOscuro;

  validateIntro = true;
  generes = [
    {
      title:"Musica Clasica",
      image:"https://formacioncatolica.org/wp-content/uploads/Articulo-Musica-Clasica-Cuarteto-1.jpg.webp",
      description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
    {
    title: "Rock",
    image: "https://cdn.pixabay.com/photo/2016/10/12/23/22/electric-guitar-1736291_1280.jpg ",
    description: "El rock es un género musical que se desarrolló durante y después de la década de 1950, caracterizado por un ritmo fuerte y el uso prominente de guitarras eléctricas."
    },
    {
      title: "Jazz",
      image: "https://flowmag.com/wp-content/uploads/2021/04/dia-internacional-del-jazz-en-el-rvbicon.jpg",
      description: "El jazz es un género musical nacido en Estados Unidos a finales del siglo XIX, conocido por su improvisación, ritmo swing y una gran expresividad instrumental."
    }
  ]
    constructor(private storageService : StorageService, private router : Router) {}

    async ngOnInit() {
     
    }
    
    async ionViewWillEnter(){
      console.log("valor de intro? " , await this.storageService.get('validateIntro'));
      this.validateIntro = await this.storageService.get('validateIntro')== null ? false: this.validateIntro;
    } 

    async cambiarColor(){
      this.colorActual = this.colorActual === this.colorOscuro ? this.colorClaro : this.colorOscuro;
      await this.storageService.set('theme',this.colorActual);
    }

    async loadStorageData(){
      const savedTheme  = await this.storageService.get('theme');

      if(savedTheme) this.colorActual = savedTheme;
    }

    goBack(){
      this.router.navigateByUrl("/intro")
      console.log("YA fue al intro? " , this.validateIntro);
    }

    // crear una funcion para ir a ver la intro, se va a conectar con un boton que debemos agregar en el HTML
    // al hacer click que me lleve a ver el intro
}

