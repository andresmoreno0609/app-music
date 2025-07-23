import { Injectable } from '@angular/core';
import * as dataArtist from './../artistas.json'

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  urlServer = 'https://music.fly.dev';

  constructor() { }

  getTracks() {
    return fetch(`${this.urlServer}/tracks`)
      .then(response => response.json());
  }

  getAlbums() {
    return fetch(`${this.urlServer}/albums`)
      .then(response => response.json());
  }

  getLocalArtists(){
    return dataArtist;
  }
}
