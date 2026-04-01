import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  private apiUrl = 'http://localhost:8000/api/estados';

  constructor(private http: HttpClient) { }

  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  criar(estado: any): Observable<any> {
    return this.http.post(this.apiUrl, estado);
  }

  atualizar(id: number, estado: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, estado);
  }

  deletar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}