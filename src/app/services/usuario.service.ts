import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { RegisterFormInterface } from '../interfaces/register-from.interface';
import { environment } from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

declare const google: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) { }


  validarToken(): Observable<boolean>{
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (res: any) => {
        localStorage.setItem('token', res.token);
      }),
      map( res => true),
      catchError( error => of(false))
    );
  }

  logOut(){
    localStorage.removeItem('token');
    google.accounts.id.revoke( 'ja.araque14@gmail.com', () => {
      this.ngZone.run( () => {
        this.router.navigateByUrl('/login');
      })
    })
  }

  crearUsuario(formData: RegisterFormInterface) {
    return this.http.post(`${base_url}/usuarios`, formData)
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token)
        })
      )
  }

  LoginUsuario(formData: RegisterFormInterface) {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token)
        })
      )
  }

  loginGoogle(token: string){
    return this.http.post(`${base_url}/login/google`, {token})
    .pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token)
      })
    )
  }
}
