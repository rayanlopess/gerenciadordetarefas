import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./acesso/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'cadastro',
    loadComponent: () => import('./acesso/cadastro/cadastro.page').then( m => m.CadastroPage)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.page').then( m => m.DashboardPage)
  },
  {
    path: 'criar-tarefa',
    loadComponent: () => import('./criar-tarefa/criar-tarefa.page').then( m => m.CriarTarefaPage)
  },
  {
    path: 'tarefa',
    loadComponent: () => import('./listar-tarefa/listar-tarefa.page').then( m => m.ListarTarefaPage)
  },
  
];
