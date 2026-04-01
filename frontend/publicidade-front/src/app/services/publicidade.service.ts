import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicidadeService {
  private apiUrl = 'http://localhost:8000/api/publicidades';

  constructor(private http: HttpClient) { }

  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  criar(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  atualizar(id: number, formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}?_method=PUT`, formData);
  }

  encerrar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}