import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlServer = 'https://music.fly.dev';

  constructor(private storageService : StorageService) { }

  getArtistById(artistId: number){
    return fetch(`${this.urlServer}/artists/${artistId}`)
    .then(response => response.json());
  }

   loginUser(data: any): Promise<any> {
    return fetch(`${this.urlServer}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: data })
    }).then(response => {
      if (!response.ok) {
        return response.json().then(err => Promise.reject(err));
      }
      return response.json();
    });
  }
  
  registerUser(data: any): Promise<any> {
    return fetch(`${this.urlServer}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => {
      if (!response.ok) {
        return response.json().then(err => Promise.reject(err));
      }
      return response.json();
    });
  }

}
