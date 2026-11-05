import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Categoria } from '../../categorias/categoria-class';
import { Categoriaservice } from '../../categorias/categoriaservice';
import { Lugarservice } from '../lugarservice';

@Component({
  selector: 'app-lugar',
  standalone: false,
  templateUrl: './lugar.html',
  styleUrl: './lugar.scss',
})
export class Lugar implements OnInit {
  camposForm: FormGroup;
  categorias: Categoria[] = [];

  constructor(
    private categoriaService: Categoriaservice,
    private service: Lugarservice
  ) {
    this.camposForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      localizacao: new FormControl('', Validators.required),
      urlFoto: new FormControl('', Validators.required),
      avaliacao: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.categoriaService.obterTodas().subscribe({
      next: (listaCategorias) => (this.categorias = listaCategorias),
      error: (erro) => console.error('Erro ao carregar categorias:', erro)
    });
  }

  salvar(): void {
    this.camposForm.markAllAsTouched(); // Marca os campos para exibir os erros se o formulário for enviado inválido
    
    if (this.camposForm.valid) {
      this.service.salvar(this.camposForm.value).subscribe({
        next: (lugar) => {
          console.log('Cadastrado com sucesso!', lugar);
          this.camposForm.reset({
            nome: '',
            categoria: '',
            localizacao: '',
            urlFoto: '',
            avaliacao: ''
          });
        },
        error: (erro) => console.error('Ocorreu um erro: ', erro)
      });
    }
  }

  isCampoInvalido(nomeCampo: string): boolean {
    const campo = this.camposForm.get(nomeCampo);
    return !!(campo?.invalid && campo?.touched && campo?.errors?.['required']);
  }
}