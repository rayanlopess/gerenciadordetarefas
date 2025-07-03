import { inject } from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';
import { AutenticacaoService } from '../service/autenticacao.service';
export const authGuard: CanActivateFn = (route, state) => {
  const autenticacaoService = inject(AutenticacaoService);
  const router = inject(Router);
  const token = sessionStorage.getItem('token');

  if(token == null || token == undefined || token == ''){
    router.navigate(['/login']);
    return false;
  }
  return true;
};
