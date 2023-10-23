import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDocentes } from '../pages/interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { IDocente } from '../pages/interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class ApiCrudService {

  constructor(private httpclient:HttpClient) { }

  listarDocentes():Observable<IDocentes>{
    return this.httpclient.get<IDocentes>(`${environment.apiUrl}/docentes`);
  }

  CrearDocente(newDocente: IDocente): Observable<IDocente>{
    return this.httpclient.post<IDocentes>(`${environment.apiUrl}/docentes`, newDocente);
  }

  BuscarDocenteId(id:number):Observable<IDocentes>{
    return this.httpclient.get<IDocentes>(`${environment.apiUrl}/docentes/?id=${id}`);
  }

  ActualizarAnimalito(docente:any):Observable<IDocentes>{
    return this.httpclient.put<IDocentes>(`${environment.apiUrl}/docentes/${docente.id}`, docente);
  }

  EliminarDocente (docente:any): Observable<IDocentes>{
    return this.httpclient.delete<IDocentes>(`${environment.apiUrl}/docentes/${docente.id}`);
  }
}
