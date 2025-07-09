import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, trash, chevronDown, personCircle, barChart, person, personAdd, logOut, chevronForward} from 'ionicons/icons';
import { Router, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { RealtimeDatabaseService } from '../firebase/realtime-database.service';
import { AlertController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterLink]
})
export class DashboardPage implements OnInit {

  public nome = sessionStorage.getItem('nome');
  public email = sessionStorage.getItem('email');
  public user = sessionStorage.getItem('user');

 


  public dados: Array<any> = []; // Array para armazenar os dados das tarefas

  constructor(
    private titleService: Title,
    private rt:Router, 
    private realtime: RealtimeDatabaseService,
    private alertController: AlertController,
  ) { 
    addIcons({add, trash, chevronDown, personCircle, barChart, person, personAdd, logOut, chevronForward});
  }

  ngOnInit() {
    this.titleService.setTitle("Dashboard");
    this.load();
  }

  adicionarTarefa(){

    this.rt.navigate(['/criar-tarefa'])
  }

  load() {
    if (!this.user) {
      console.error('Nenhum usuário logado');
      this.dados = [];
      return;
    }
  
    this.realtime.query('/tarefas', (snapshot: any) => {
      if (snapshot.val() !== null) {
        const dadosBrutos = snapshot.val();
        this.dados = Object.entries(dadosBrutos)
          .map(([id, item]: [any, any]) => {
            // Verifica se o item existe e tem a estrutura esperada
            if (item && typeof item === 'object' && item.responsavel) {
              return {
                id: id,  // Usando a chave do Firebase como ID
                ...item  // Copia todas as propriedades do item
              };
            }
            return null;
          })
          .filter((item: any) => 
            item !== null && 
            item.responsavel === this.user
          );
      } else {
        this.dados = [];
      }
      console.log('Dados carregados:', this.dados);
    });
  }

  listarTarefas(id: string) {
    this.rt.navigate(['/tarefa']);
    sessionStorage.setItem('id_tarefa', id);
    
  }










  deletarTudo(){

  }

  criarConta(){
    this.rt.navigate(['/cadastro'])
  }
 logarConta(){
    this.rt.navigate(['/login'])
  }

  logOut(){
    sessionStorage.clear();
    this.rt.navigate(['/login']);
  }

}
