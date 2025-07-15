import { CanActivate } from '@angular/router';

export class introGuard implements CanActivate {
  canActivate(){
    return true;
  }
}
