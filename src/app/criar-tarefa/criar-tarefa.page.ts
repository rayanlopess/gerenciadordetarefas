import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';  


import { addIcons } from 'ionicons';
import { add, trash, chevronDown, personCircle} from 'ionicons/icons';


import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { RealtimeDatabaseService } from '../firebase/realtime-database.service';
import { AlertController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-criar-tarefa',
  templateUrl: './criar-tarefa.page.html',
  styleUrls: ['./criar-tarefa.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class CriarTarefaPage implements OnInit {

  public quantidades: Array<number> = [1, 2, 3, 4, 5];
  public quantidade = 0;
  public id: number = 0;
  public tituloTarefa = '';
  public descricaoTarefa = '';
  public etapas: {descricao: string}[] = []; // Array para armazenar as etapas
  public usuario: string = sessionStorage.getItem('user') || '';

  constructor(
    private titleService: Title,
    private rt: Router,
    private realtime: RealtimeDatabaseService,
    private ar: ActivatedRoute,
    private alertController: AlertController
    
  ) {
    addIcons({add, trash, chevronDown, personCircle});

    this.ar.params.subscribe((param:any)=> {
      this.id = param.id;
    })
  }

  ngOnInit() {
    this.titleService.setTitle("Adicionar Tarefa");

  }

  // Método para criar um array com base na quantidade selecionada
  atualizarEtapas() {
    // Redimensiona o array de etapas conforme a quantidade selecionada
    const novaQuantidade = this.quantidade;
    const diferenca = novaQuantidade - this.etapas.length;
    
    if (diferenca > 0) {
      // Adiciona novas etapas
      for (let i = 0; i < diferenca; i++) {
        this.etapas.push({descricao: ''});
      }
    } else if (diferenca < 0) {
      // Remove etapas excedentes
      this.etapas.splice(novaQuantidade, -diferenca);
    }

    
  }
  async salvar() {
    if (!this.tituloTarefa || !this.descricaoTarefa || !this.etapas || this.etapas.length === 0) {
      const alert = await this.alertController.create({
        header: 'Preencha os campos corretamente!',
        buttons: [{
          text: 'OK',
          role: 'OK',
          handler: () => {
   
          },
        },],
      });
  
      await alert.present();
      
    }
    else{
      this.realtime.add('tarefas', {
        titulo: this.tituloTarefa,
        descricao: this.descricaoTarefa,
        responsavel: this.usuario,
        etapas: this.etapas.map((etapa) => ({
          descricao: etapa.descricao,
          concluido: false, 
        })),
        progresso: 0 
      })
      .subscribe({
        next: async (res: any) => {
          const alert = await this.alertController.create({
            header: 'Tarefa cadastrada com sucesso!',
            buttons: [{
              text: 'OK',
              role: 'OK',
              handler: () => {
       
                this.rt.navigate(['/dashboard']);
                console.log("Titulo: ",this.tituloTarefa, "Descricao: ",this.descricaoTarefa, "Responsavel", this.usuario, "Etapas: ", this.etapas);
              },
            },],
          });
      
          await alert.present();
          
        },
        error: async (err) => {
          const alert = await this.alertController.create({
            header: 'Erro ao cadastrar tarefa!',
            buttons: [{
              text: 'OK',
              role: 'OK',
              handler: () => {
   
  
              },
            },],
          });
      
          await alert.present();
          
        }
      });
    }
    
  
  
    
  }
}
