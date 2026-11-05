import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// IMPORTANTE: Importe o arquivo da classe de dados, não o componente
import { Lugar } from './lugar'; // Ajuste o caminho relativo se necessário (ex: '../lugarclasse')

@Injectable({
  providedIn: 'root',
})
export class Lugarservice {
  constructor(private http: HttpClient) {}

  salvar(lugar: Lugar): Observable<Lugar> {
    return this.http.post<Lugar>('http://localhost:3000/lugares', lugar);
  }

  obterTodos(): Observable<Lugar[]> {
    return this.http.get<Lugar[]>('http://localhost:3000/lugares');
  }

  filtrar(nome: string = '', categoria: string = '-1'): Observable<Lugar[]> {
    let parametros = new HttpParams();

    // 1. Remove espaços em branco acidentais no início ou fim da string
    const nomeLimpo = nome ? nome.trim() : '';

    if (nomeLimpo) {
      parametros = parametros.set('nome_like', nomeLimpo);
    }

    // 2. Garante que a categoria não é vazia, nula e nem a opção "Todas" (-1)
    if (categoria && categoria.trim() !== '' && categoria !== '-1') {
      parametros = parametros.set('categoria', categoria);
    }

    return this.http.get<Lugar[]>('http://localhost:3000/lugares', {
      params: parametros
    });
  }
}