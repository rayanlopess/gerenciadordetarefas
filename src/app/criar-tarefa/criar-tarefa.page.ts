import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';  


import { addIcons } from 'ionicons';
import { add, trash, chevronDown, personCircle} from 'ionicons/icons';


import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { RealtimeDatabaseService } from '../firebase/realtime-database.service';

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
    private ar: ActivatedRoute
    
    
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
  salvar() {
    if (!this.tituloTarefa || !this.descricaoTarefa || !this.etapas || this.etapas.length === 0) {
      console.error('Preencha todos os campos obrigatórios');
      return;
    }
  
    const taskData = {
      
    };
  
    this.realtime.add('tarefas', {
      titulo: this.tituloTarefa,
      descricao: this.descricaoTarefa,
      responsavel: this.usuario,
      etapas: this.etapas.map((etapa) => ({
        descricao: etapa.descricao,
        concluida: false, 
      }))
    })
    .subscribe({
      next: (res: any) => {
        console.log('Tarefa salva com sucesso:', res);
        // Reset form or navigate away
      },
      error: (err) => {
        console.error('Erro ao salvar a tarefa:', err);
        // Show error to user
      }
    });
  }
}
