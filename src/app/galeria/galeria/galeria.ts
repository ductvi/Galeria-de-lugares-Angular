import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Categoria } from '../../categorias/categoria-class';
import { Lugarservice } from '../../lugares/lugarservice';
import { Categoriaservice } from '../../categorias/categoriaservice';
import { Lugar } from '../../lugares/lugar'; 

@Component({
  selector: 'app-galeria',
  standalone: false,
  templateUrl: './galeria.html',
  styleUrl: './galeria.scss',
})
export class Galeria implements OnInit {

  lugares: Lugar[] = [];
  categoriasFiltro: Categoria[] = [];
  nomeFiltro: string = '';
  categoriaFiltro = '';

  constructor(
    private lugarService: Lugarservice,
    private categoriaService: Categoriaservice,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.categoriaService.obterTodas().subscribe({
      next: (categorias) => {
        this.categoriasFiltro = categorias;
        this.cdr.markForCheck();
      },
      error: (erro) => console.error('Erro ao carregar categorias:', erro)
    });

    this.lugarService.obterTodos().subscribe({
      next: (lugaresResposta) => {
        this.lugares = lugaresResposta;
        this.cdr.markForCheck();
      },
      error: (erro) => console.error('Erro ao carregar lugares:', erro)
    });
  }

  filtrar(){
    this.lugarService.filtrar(this.nomeFiltro, this.categoriaFiltro)
    .subscribe(resultado => this.lugares = resultado);
  }
}