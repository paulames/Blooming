import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class RespuestaService {
    private basePath=`${environment.base_url}/resultados/`;
    private httpOptions: any;
  constructor(private http: HttpClient) {}
  
  // Opciones Http
  private getHeader(){
    this.httpOptions = {
      headers: this.addToken()
    };
  }

    private getToken(){
      let token;
      if (typeof localStorage !== 'undefined') {
        token = localStorage.getItem('token');
      }
      return token;
    }

    private addToken(): HttpHeaders {
      const token = this.getToken();
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'x-token': `${token}`,
      });
    }

    //LLAMADAS API
    getRespuesta(){
        this.getHeader();
        return this.http.get(this.basePath, this.httpOptions);
    }

    getRespuestasAlumno(id: any, gravedad: number, desde?: number, filas?: number, ordenar?: number, textoBusqueda?: string){
        this.getHeader();
        if(!desde){
          desde = 0;
        }
        if(!filas){
          filas = 0;
        }
        return this.http.get(this.basePath+'?ID_Alumno='+id+'&Gravedad='+gravedad+'&numFilas='+filas+'&desde='+desde+'&ordenar='+ordenar+'&textoBusqueda='+textoBusqueda, this.httpOptions);
    }

    getRespuestasClase(id: any, desde?: number, filas?: number){
      this.getHeader();
      if(!desde){
        desde = 0;
      }
      if(!filas){
        filas = 0;
      }
      return this.http.get(this.basePath+'?ID_Clase='+id+'&numFilas='+filas+'&desde='+desde, this.httpOptions);
    }

    getRespuestasCentro(id: any, gravedad: number, desde?: number, filas?: number, ordenar?: number, textoBusqueda?: string){
      this.getHeader();
      if(!desde){
        desde = 0;
      }
      if(!filas){
        filas = 0;
      }
      if(!textoBusqueda){
        textoBusqueda = '';
      }
      return this.http.get(this.basePath+'?ID_Centro='+id+'&Gravedad='+gravedad+'&numFilas='+filas+'&desde='+desde+'&ordenar='+ordenar+'&textoBusqueda='+textoBusqueda, this.httpOptions);
    
    }

    postRespuesta(resultadoData: any){
        this.getHeader();
        return this.http.post(this.basePath, resultadoData, this.httpOptions);
    }

}