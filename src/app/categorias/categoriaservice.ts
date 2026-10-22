import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from './categoria-class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Categoriaservice {
  constructor(private http: HttpClient) {}

  salvar(categoria: Categoria) : Observable<Categoria>{
    return this.http.post<Categoria>('http://localhost:3000/categorias', categoria)
  }

  obterTodas() : Observable<Categoria[]> {
    return this.http.get<Categoria[]>('http://localhost:3000/categorias')
  }
}
