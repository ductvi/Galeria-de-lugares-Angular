import {Inject, inject} from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Authgoogle } from './authgoogle';

//Proteção das rotas: o usuário não pode navegar se não estiver logado.
export const authGuard: CanActivateFn = (route, state) => {
  const loginService: Authgoogle = inject(Authgoogle)
  const router: Router = Inject(Router);
  const loggedProfile = loginService.getLoggedProfile();

  if(loggedProfile){
    return true;
  }

  return false;
};
