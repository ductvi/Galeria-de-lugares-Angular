import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import { Categoriaservice } from '../categoriaservice';
@Component({
  selector: 'app-categoria',
  standalone: false,
  templateUrl: './categoria.html',
  styleUrl: './categoria.scss',
})
export class Categoria {
  camposForm: FormGroup;

  constructor(private service: Categoriaservice){
    this.camposForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required)
    })
  }

  salvar(){
    this.camposForm.markAllAsTouched();
    if(this.camposForm.valid){
      this.service.salvar(this.camposForm.value)
      .subscribe({
        next: categoria => {
          console.log('Salva com sucesso!', categoria)
          this.camposForm.reset()
        },
        error: erro => console.error('Ocorreu um erro: ', erro)
      })

    }
  }

  isCampoInvalido(nomeCampo: string) : boolean{
    const campo = this.camposForm.get(nomeCampo)
    return campo?.invalid && campo?.touched && campo?.errors?.['required'] || false
  }
}
