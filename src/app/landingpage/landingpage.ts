import { Component } from '@angular/core';
import { Profile } from './profile.model';
import { Router } from '@angular/router';
import { Authgoogle } from '../authgoogle';

@Component({
  selector: 'app-landingpage',
  standalone: false,
  templateUrl: './landingpage.html',
  styleUrl: './landingpage.scss',
})
export class Landingpage {
  profile: Profile | undefined;

  constructor(private router: Router, private loginService: Authgoogle){}

  //Método para ao clicar no botão (se estiver logado), navegar no site.
  navegar(){
    this.router.navigate(['/paginas/galeria']);
  }

  //Função para logar com o Google
  logarComGoogle(){
    this.loginService.login();
  }

  //Verificar se o usuário já está logado
  isLoggedIn() : boolean{
    const dadosGoogle = this.loginService.getLoggedProfile();
    this.profile = this.loginService.getLoggedProfile();
    return !!this.profile
  }
}
