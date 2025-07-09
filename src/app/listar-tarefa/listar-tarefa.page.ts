import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RealtimeDatabaseService } from '../firebase/realtime-database.service';
//import { ActivatedRoute } from '@angular/router';
//import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-listar-tarefa',
  templateUrl: './listar-tarefa.page.html',
  styleUrls: ['./listar-tarefa.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ListarTarefaPage implements OnInit {
  public etapas: any[] = [];
  public descricao = '';
  public titulo = '';


  public progress = 0;
  public porcentagem = '0%';
  public checkedEtapas: boolean[] = [];

  public id:any = sessionStorage.getItem('id_tarefa');


  constructor(
    public realtime: RealtimeDatabaseService,
  ) { }

  ngOnInit() {

    this.calcularProgresso();
    this.mostrarInformacao(this.id);
  }

  getEtapasArray(): number[] {
    return Array(this.etapas.length).fill(0).map((x, i) => i);
  }


  calcularProgresso() {
    const totalEtapas = this.etapas.length;
    const etapasConcluidas = this.checkedEtapas.filter(checked => checked).length;
    
    this.progress = etapasConcluidas / totalEtapas;
    this.porcentagem = Math.round(this.progress * 100) + '%';
  }

  

  async mostrarInformacao(id: number) { 
    const tarefa = await this.realtime.getById('/tarefas', id);

    if (!tarefa) {
      throw new Error('tarefa não encontrado');
    } else {
        this.titulo = tarefa.titulo;
        this.descricao = tarefa.descricao;
        this.etapas = tarefa.etapas || [];
        
        // Inicializa o array de checkboxes baseado no estado concluido de cada etapa
        this.checkedEtapas = this.etapas.map(etapa => etapa.concluido || false);
        this.calcularProgresso();
    }
  }

  async atualizarTarefa() {
    // Atualiza o estado concluido de cada etapa baseado nas checkboxes
    for (let i = 0; i < this.etapas.length; i++) {
      this.etapas[i].concluido = this.checkedEtapas[i];
    }

    try {
      await this.realtime.update('/tarefas', this.id, {
        etapas: this.etapas
      });
      // Mostrar algum feedback para o usuário (opcional)
      console.log('Tarefa atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      // Mostrar mensagem de erro para o usuário (opcional)
    }
  }

    
atualizarCheckbox(index: number) {
  // Atualiza o estado da etapa localmente (o banco só será atualizado quando clicar no botão)
  this.etapas[index].concluido = this.checkedEtapas[index];
  this.calcularProgresso();
} 
      
  
}



