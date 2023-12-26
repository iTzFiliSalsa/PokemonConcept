import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestGuard implements CanActivate {

  constructor(
    private router: Router
  ){}


  canActivate(): boolean{
    this.router.navigate(["/menu"]);
    return false;
  }
  
}
