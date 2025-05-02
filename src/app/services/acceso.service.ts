import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appSettings } from '../settings/appsettings';
import { User } from '../interfaces/User';
import { Observable } from 'rxjs';
import { ResponseAcceso } from '../interfaces/ReponseAcceso';
import { Login } from '../interfaces/Login';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {
  private http = inject(HttpClient);
  private baseUrl: string = appSettings.apiUrl;
  constructor() { }

  private getHeaders(){
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'applicaction/json',
    });
  }

  //Metodo para registrar usuarios
  registrarse(objeto: User): Observable<ResponseAcceso>{
    const headers = this.getHeaders();

    return this.http.post<ResponseAcceso>(
      `${this.baseUrl}/register`, objeto, { headers }
    );
  }
  
  //Metodo para login
  login(objeto: Login): Observable<ResponseAcceso>{
    const headers = this.getHeaders();

    return this.http.post<ResponseAcceso>(
      `${this.baseUrl}/login`, objeto, { headers }
    );
  }

}
