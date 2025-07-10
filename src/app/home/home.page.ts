import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, CommonModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage {
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
    constructor() {}
}

