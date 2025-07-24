import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, trash, chevronDown, personCircle, barChart, person, personAdd, logOut, chevronForward } from 'ionicons/icons';
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




  constructor(
    private titleService: Title,
    private rt: Router,
    private realtime: RealtimeDatabaseService,
    private alertController: AlertController,
  ) {
    addIcons({ add, trash, chevronDown, personCircle, barChart, person, personAdd, logOut, chevronForward });
  }

  ngOnInit() {
    this.titleService.setTitle("Dashboard");
    this.load();
  }

  adicionarTarefa() {

    this.rt.navigate(['/criar-tarefa'])
  }

  // Adicione esta propriedade na sua classe para armazenar as porcentagens:
  progressoTotal: number[] = []; // Vetor para armazenar as porcentagens

  dados: any[] = [];          // Armazena as tarefas
  progressos: number[] = []; // Armazena as porcentagens
  mediaTotal: number = 0;     // Armazena a média calculada
  porcentagemTotal:any = 0;

  load() {
    if (!this.user) {
      console.error('Nenhum usuário logado');
      this.dados = [];
      this.progressos = [];
      this.mediaTotal = 0;
      return;
    }

    this.realtime.query('/tarefas', (snapshot: any) => {
      if (snapshot.val() !== null) {
        const dadosBrutos = snapshot.val();

        // Filtra as tarefas do usuário logado
        this.dados = Object.entries(dadosBrutos)
          .map(([id, item]: [any, any]) => {
            if (item && typeof item === 'object' && item.responsavel) {
              return { id, ...item };
            }
            return null;
          })
          .filter((item: any) => item !== null && item.responsavel === this.user);

        // Extrai as porcentagens e calcula a média
        this.progressos = this.dados
          .map((tarefa: any) => tarefa.progresso)
          .filter((progresso: any) => typeof progresso === 'number');

        // Calcula a média (soma / quantidade)
        if (this.progressos.length > 0) {
          const soma = this.progressos.reduce((total, num) => total + num, 0);
          this.mediaTotal = soma / this.progressos.length;

          this.porcentagemTotal = (this.mediaTotal * 100).toFixed(0); 

        } else {
          this.mediaTotal = 0; // Caso não haja porcentagens válidas
        }

      } else {
        this.dados = [];
        this.progressos = [];
        this.mediaTotal = 0;
      }
    });
  }

  listarTarefas(id: string) {
    this.rt.navigate(['/tarefa']);
    sessionStorage.setItem('id_tarefa', id);

  }
  async deletarTudo() {
    // Recupera o ID do usuário logado (do sessionStorage)
    const userId = sessionStorage.getItem('user'); // ou localStorage, dependendo de onde você armazena

    if (!userId) {
      console.error("Usuário não está logado.");
      return;
    }

    const alert = await this.alertController.create({
      header: 'Deseja realmente deletar TODAS as suas tarefas?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Operação cancelada.');
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: async () => {
            const success = await this.realtime.deleteUserTasks(userId);

            if (success) {
              const alert = await this.alertController.create({
                header: 'Todas as tarefas foram deletadas com sucesso!',
                buttons: [{
                  text: 'OK',
                  role: 'ok',
                  handler: async () => {
                  }
                }],
              });

              await alert.present();

            }
            else {
              const alert = await this.alertController.create({
                header: 'Não há tarefas para serem deletadas!',
                buttons: [{
                  text: 'OK',
                  role: 'ok',
                  handler: async () => {
                  }
                }],
              });

              await alert.present();
            }
          },
        },
      ],
    });

    await alert.present();
  }


  async logOut() {
    const alert = await this.alertController.create({
      header: 'Deseja realmente fazer Log-Out?',
      buttons: [{
        text: 'Cancelar',
        role: 'cancelar',
        handler: () => {
          console.log('Alert canceled');
        },
      },
      {
        text: 'OK',
        role: 'ok',
        handler: async () => {
          sessionStorage.clear();
          this.rt.navigateByUrl('/login').then(() => {
            window.location.reload(); // <--- SOLUÇÃO 4
          });
        },
      }],
    });

    await alert.present();

  }

}
