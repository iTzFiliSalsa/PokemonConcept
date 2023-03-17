import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon';
import { Messages } from '../../constants/messages';

@Injectable({
  providedIn: 'root'
})
export class ApiCallerService {

  public readonly api: string;

  constructor(
    private _http: HttpClient
  ) {
    this.api = Messages.URL;
  }

  private _HEADERS(){
    const HEADERS ={
      headers: new HttpHeaders({
        'access-control-allow-origin': '*',
        'Content-Type': 'application/json'
      })
    }
    return HEADERS;
  }

    /**
   * Función para llamadas de tipo GET
   * @param url Url del EndPoint
   * @returns 
   */
    public get(url: string): Observable<Array<Pokemon>>{
      return this._http.get<Array<Pokemon>>(`${this.api}${url}`);
    }
  
    /**
     * Función para llamadas de tipo POST
     * @param url Url del EndPoint
     * @param body Cuerpo de la API
     * @returns Retorna Array dependiendo de la llamada
     */
    public post(url: string, body: any){
      return this._http.post(`${this.api}${url}`, body, this._HEADERS());
    }

    /**
     * Función para llamadas de tipo DELETE
     * @param url Url del EndPoint
     * @param body Cuerpo de la API
     * @returns Retorna dependiendo de la llamada
     */
    public delete(url: string){
      return this._http.delete(`${this.api}${url}`);
    }
  
    /**
     * Función para llamadas de tipo PUT
     * @param url Url del EndPoint
     * @param body Cuerpo de la API
     * @returns Retorna Array dependiendo de la llamada
     */
    public put(url: string, body: any){
      return this._http.put(`${this.api}${url}`, body, this._HEADERS());
    }
}
